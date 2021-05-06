import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms"

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalForm?: FormGroup;
  option3List: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.modalForm = this.formBuilder.group({
      options: this.formBuilder.array([this.group_Options()])
      
    })

  }

  optionArray(): FormArray {
    return this.modalForm.get('options') as FormArray
  }

  group_Options(): FormGroup {
    return this.formBuilder.group({
      option1: this.formBuilder.control(""),
      option2: this.formBuilder.control(""),
      option3Array: this.formBuilder.array([this.formBuilder.group({
         option3: this.formBuilder.control("")
      })])
    })
  }

  removeOption3(groupIndex) {
     let control = ((this.modalForm.get('options') as FormArray).at(groupIndex).get('option3Array') as FormArray);
      control.removeAt(groupIndex);
     
  }

  remove(index) {
    let control = <FormArray>(<any>this.modalForm.controls).options
      control.removeAt(index);
  }

  addOption3(groupIndex) : FormArray {
   this.option3List = ((this.modalForm.get('options') as FormArray).at(groupIndex).get('option3Array') as FormArray);
   this.option3List.push(   this.formBuilder.group({
         option3: new FormControl("")
        }));
  
 
  return this.option3List;
 
  }

  add() {
    let objectArr = <FormArray>(<any>this.modalForm.controls)
          .options
        objectArr.push(
          this.formBuilder.group(
            {
              option1: new FormControl(""),
              option2: new FormControl(""),
              option3Array: this.formBuilder.array([this.formBuilder.group({
                 option3: this.formBuilder.control("")
               })])
            }
          )
        )
  }

  submit(){
    console.log(this.modalForm.value);
  }
}

