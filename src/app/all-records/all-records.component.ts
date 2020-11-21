import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Record } from '../entities/Record';
import { SelectItem } from 'primeng/api';
import { FilterUtils } from 'primeng/utils';
import { MultiSelect } from 'primeng/multiselect';


@Component({
  selector: 'app-all-records',
  templateUrl: './all-records.component.html',
  styleUrls: ['./all-records.component.scss']
})
export class AllRecordsComponent implements OnInit {

  cols: any[];
  records:  Record[];
  title: string;
  types: SelectItem[];
  maps: SelectItem[];
  players: SelectItem[];
  gobbles: SelectItem[];
  ranks: SelectItem[];
  rounds: SelectItem[];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.title = "ROUND RECORDS";

    this.data.getRecords().subscribe(
      data => {
        this.records = data.filter(function(data) {
          return data.type == 'Round';
        })
      }
    );
    
    this.cols = [
      { field: 'record', header: 'Record'},
      { field: 'map', header: 'Map'},
      { field: 'gobble', header: 'Gobblegums'},
      { field: 'numPlayers', header: 'Num Players'},
      { field: 'rank', header: 'Rank'},
      { field: 'achieved', header: 'Round'}
    ];

    this.types = [
      { label: 'All Records', value: null},
      { label: 'High Rounds', value: 'High Rounds'},
      { label: 'Flawless', value: 'Flawless'},
      { label: 'First Room', value: 'First Room'},
      { label: 'No Power', value: 'No Power'},
      { label: 'No Alternate Ammo (solo)', value: 'No AATs'},
      { label: 'No Juggernog (solo)', value: 'No Jug'},
      { label: 'No Perks (solo)', value: 'No Perks'}
    ];

    this.maps = [
      { label: 'All Maps', value: null},
      { label: 'Ascension', value: 'Ascension'},
      { label: 'Dead Ops Arcade II', value: 'Dead Ops Arcade II'},
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
      { label: 'Mega Gobblegum', value: 'all-gobblegum'},
      { label: 'Not Applicable', value: 'N/A'}
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

    this.rounds = [
      { label: 'All Rounds', value: null},
      { label: 'Unset Rounds', value: -1}
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
