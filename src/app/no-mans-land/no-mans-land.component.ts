import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Record } from '../entities/Record';
import { SelectItem } from 'primeng/api';
import { FilterUtils } from 'primeng/utils';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-no-mans-land',
  templateUrl: './no-mans-land.component.html',
  styleUrls: ['./no-mans-land.component.scss']
})
export class NoMansLandComponent implements OnInit {

  cols: any[];
  records:  Record[];
  title: string;
  types: SelectItem[];
  maps: SelectItem[];
  players: SelectItem[];
  gobbles: SelectItem[];
  ranks: SelectItem[];
  kills: SelectItem[];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.title = "NO MANS LAND RECORDS";

    this.data.getRecords().subscribe(
      data => {
        this.records = data.filter(function(data) {
          return data.type == 'Kills';
        })
      }
    );

    this.cols = [
      { field: 'record', header: 'Record'},
      { field: 'map', header: 'Map'},
      { field: 'gobble', header: 'Gobblegums'},
      { field: 'numPlayers', header: 'Num Players'},
      { field: 'rank', header: 'Rank'},
      { field: 'achieved', header: 'Kills'}
    ];

    this.types = [
      { label: 'No Mans Land', value: 'No Mans Land'}
    ];

    this.maps = [
      { label: 'Moon', value: 'Moon'}
    ];

    this.gobbles = [
      { label: 'No Limitation', value: null},
      { label: 'No Gobblegum', value: 'no-gobblegum'},
      { label: 'Classic Gobblegum', value: 'classic-gobblegum'},
      { label: 'Mega Gobblegum', value: 'all-gobblegum'}
    ];

    this.players = [
      { label: '1 Player', value: '1 Player'},
      { label: '2 Player', value: '2 Player'}
    ];

    this.ranks = [
      { label: 'All Ranks', value: null},
      { label: 'World Records', value: 1}
    ];

    this.kills = [
      { label: 'All Kills', value: null},
      { label: 'Unset Kills', value: -1}
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
