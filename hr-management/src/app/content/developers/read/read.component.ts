import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { SkillLevelListComponent } from '../../table-level-lists/skill-level-list/skill-level-list.component';
import { TableLevelListsComponent } from '../../table-level-lists/table-level-lists.component';
import { SelectionListComponent } from '../../selection-list/selection-list.component';
import { InformationPanelComponent } from '../../information-panel/information-panel.component';
import { OptionsPanelComponent } from './options-panel/options-panel.component';

//Model
import { Employee } from 'app/model/employee';
import { EmployeeSkills } from 'app/model/employee-skills';
import { Skill } from 'app/model/skill';

//Services
import { DatabaseService } from 'app/services/database.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
  providers: [ TableLevelListsComponent ]
})
export class ReadComponent implements OnInit {
  employee: Employee;
  skills: Skill[];
  editName: boolean = false;
  addSkillOption: number = 0;
  removeSkillOption: number = 0;
  element: string = "developer";
  //selectedValue: string;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private location: Location,
    private tableLevelListsComponent: TableLevelListsComponent
  ) { }

  ngOnInit() {
    this.route.params
        .switchMap((params: Params) => this.databaseService.getEmployee(params['id']))
        .subscribe(employee => this.employee = employee);
    this.databaseService.getSkills().then(skills => this.skills = skills);
  }

  goBack(): void {
    this.location.back();
  }

  editUser(): void {
    this.editName = true;
  }

  closeEditUser(): void {
    this.editName = false;
  }

  activateAddSkillOption(option: number): void {
    this.removeSkillOption = 0;
    if(this.addSkillOption == option){
      this.addSkillOption = 0;
    } else {
      this.addSkillOption = option;
    }
  }

  activateRemoveSkillOption(option: number): void {
    this.addSkillOption = 0;
    if(this.removeSkillOption == option){
      this.removeSkillOption = 0;
    } else {
      this.removeSkillOption = option;
    }
  }

  /*assignSkill(skillLevel: string): void {
    this.databaseService.assignSkill(this.employee.id, this.selectedValue, skillLevel);
  }*/
}
