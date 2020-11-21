import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Record } from '../entities/Record';
import { SelectItem } from 'primeng/api';
import { FilterUtils } from 'primeng/utils';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-speedruns',
  templateUrl: './speedruns.component.html',
  styleUrls: ['./speedruns.component.scss']
})
export class SpeedrunsComponent implements OnInit {

  cols: any[];
  records:  Record[];
  title: string;
  types: SelectItem[];
  maps: SelectItem[];
  players: SelectItem[];
  gobbles: SelectItem[];
  ranks: SelectItem[];
  times: SelectItem[];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.title = "SPEEDRUN RECORDS";

    this.data.getRecords().subscribe(
      data => {
        this.records = data.filter(function(data) {
          return data.type == 'Time';
        })
      }
    );

    this.cols = [
      { field: 'record', header: 'Record'},
      { field: 'map', header: 'Map'},
      { field: 'gobble', header: 'Gobblegums'},
      { field: 'numPlayers', header: 'Num Players'},
      { field: 'rank', header: 'Rank'},
      { field: 'achieved', header: 'Time'}
    ];

    this.types = [
      { label: 'All Records', value: null},
      { label: '30 Speedrun', value: '30 Speedrun'},
      { label: '50 Speedrun', value: '50 Speedrun'},
      { label: '100 Speedrun', value: '100 Speedrun'},
      { label: '255 Speedrun', value: '255 Speedrun'},
      { label: 'EE Speedrun', value: 'EE Speedrun'}, 
    ];

    this.maps = [
      { label: 'All Maps', value: null},
      { label: 'Ascension', value: 'Ascension'},
      { label: 'Der Eisendrache', value: 'Der Eisendrache'},
      { label: 'Gorod Krovi', value: 'Gorod Krovi'},
      { label: 'Kino Der Toten', value: 'Kino Der Toten'},
      { label: 'Moon', value: 'Moon'},
      { label: 'Nacht Der Untoten', value: 'Nacht Der Untoten'},
      { label: 'Origins', value: 'Origins'},
      { label: 'Revelations', value: 'Revelations'},
      { label: 'Shadows Of Evil', value: 'Shadows Of Evil'},
      { label: 'Shangri-La', value: 'Shangri-La'},
      { label: 'Shi No Numa', value: 	'Shi No Numa'},
      { label: 'The Giant', value: 'The Giant'},
      { label: 'Verruckt', value: 'Verruckt'},
      { label: 'Zetsubou No Shima', value: 'Zetsubou No Shima'}
    ];

    this.gobbles = [
      { label: 'No Limitation', value: null},
      { label: 'No Gobblegum', value: 'no-gobblegum'},
      { label: 'Classic Gobblegum', value: 'classic-gobblegum'},
      { label: 'Mega Gobblegum', value: 'all-gobblegum'}
    ];

    this.players = [
      { label: '1 Player', value: '1 Player'},
      { label: '2 Player', value: '2 Player'},
      { label: '3 Player', value: '3 Player'},
      { label: '4 Player', value: '4 Player'}
    ];

    this.ranks = [
      { label: 'All Ranks', value: null},
      { label: 'World Records', value: 1}
    ];

    this.times = [
      { label: 'All Times', value: null},
      { label: 'Unset Times', value: -1}
    ];

    FilterUtils['custom'] = (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
      }

      if (value === undefined || value === null) {
          return false;
      }
      
      return parseInt(filter) > value;
    }
  }
}
