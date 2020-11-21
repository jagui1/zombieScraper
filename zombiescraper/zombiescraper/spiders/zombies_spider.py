import scrapy


class QuotesSpider(scrapy.Spider):
    name = "zombies"
    start_urls = [
        'https://zombiesworldrecords.com/leaderboards/',
    ]

    def parse(self, response):
        for gameTile in response.css('a.GameTileLink'):
            if gameTile.css('div.GameTile div.Label span::text').get() == 'Black Ops 3':
                yield response.follow(gameTile.attrib['href'], callback=self.parse_records)

    def parse_records(self, response):
        multiplayer = ['High Rounds', 'Flawless', 'First Room', 'No Power']
        nml = ['No Mans Land']
        solo = ['No AATs', 'No Perks', 'No Jug']
        speedruns = ['30 Speedrun', '50 Speedrun', '100 Speedrun', '255 Speedrun', 'EE Speedrun']
        deadops = ['Dead Ops Arcade']
        deadopsLink = None
        nomansLink = None
        recordLinks = []

        for recordTile in response.css('a.RecordTileLink'):
            if recordTile.css('div.RecordTile div.Label span::text').get() in multiplayer+solo+speedruns:
                recordLinks.append(recordTile.attrib['href'])
            elif recordTile.css('div.RecordTile div.Label span::text').get() in deadops:
                deadopsLink = recordTile.attrib['href']
            elif recordTile.css('div.RecordTile div.Label span::text').get() in nml:
                nomansLink = recordTile.attrib['href']

        yield response.follow(deadopsLink, callback=self.parse_doa)
        yield response.follow(nomansLink, callback=self.parse_map)
        yield from response.follow_all(recordLinks, self.parse_games)

    def parse_games(self, response):
        yield from response.follow_all(response.css('a.MapTileLink'), self.parse_map)

    def parse_games_test(self, response):
        for mapTile in response.css('a.MapTileLink'):
          if(mapTile.css('div.Label span::text').get() == 'The Giant'):
            yield response.follow(response.css('a.MapTileLink').attrib['href'], self.parse_map)

    def parse_map(self, response):
        #['High Rounds', ' - ', 'Shadows Of Evil']
        title = response.css('div.page-title span::text').getall()

        if len(response.css('div.SubBoard')) > 0:
            for subBoard in response.css('div.SubBoard'):
                for board in subBoard.css('div.Board'):
                    for row in board.css('div.Row'):
                        if row.css('div.Rank::text').get() is not None:
                            yield {
                                'record': title[0],
                                'map': title[2],
                                'gobble': subBoard.attrib['data-id'],
                                'numPlayers': board.css('div.Header::text').get(),
                                'rank': int(row.css('div.Rank::text').get()), 
                                'achieved': -1 if row.css('a.Achieved::text').extract_first() is None else row.css('a.Achieved::text').extract_first(),
                                'type': board.css('div.Legend div.Achieved::text').get()
                            }
        #No gobblegum options
        else:
            for board in response.css('div.Board'):
                for row in board.css('div.Row'):
                    if row.css('div.Rank::text').get() is not None:
                        yield {
                            'record': title[0],
                            'map': title[2],
                            'gobble': 'N/A',
                            'numPlayers': board.css('div.Header::text').get(),
                            'rank': int(row.css('div.Rank::text').get()), 
                            'achieved': -1 if row.css('a.Achieved::text').extract_first() is None else row.css('a.Achieved::text').extract_first(),
                            'type': board.css('div.Legend div.Achieved::text').get()
                        }
            
    def parse_doa(self, response):
        #['Dead Ops Arcade', ' - ', 'Dead Ops Arcade II']
        title = response.css('div.page-title span::text').getall()

        for subBoard in response.css('div.SubBoard'):
            for board in subBoard.css('div.Board'):
                for row in board.css('div.Row'):
                    if row.css('div.Rank::text').get() is not None:                    
                        yield {
                            # high-round -> High Rounds | flawless - Flawless
                            'record': 'High Rounds' if subBoard.attrib['data-id'] == 'high-round' else subBoard.attrib['data-id'].capitalize(),
                            'map': title[2],
                            'gobble': 'N/A',
                            'numPlayers': board.css('div.Header::text').get(),
                            'rank': int(row.css('div.Rank::text').get()), 
                            'achieved': -1  if row.css('a.Achieved::text').extract_first() is None else int(row.css('a.Achieved::text').extract_first()),
                            'type': board.css('div.Legend div.Achieved::text').get()
                        }
