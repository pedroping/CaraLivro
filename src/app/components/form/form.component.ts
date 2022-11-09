import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/Post';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() btntipo!: string
  @Input() data?: Post
  @Output() onSubmit = new EventEmitter<Post>()

  postForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    if(this.data){
      this.postForm = new FormGroup({
        id: new FormControl(this.data.id),
        title: new FormControl(this.data.title,[Validators.required]),
        description: new FormControl(this.data.description, [Validators.required]),
        image: new FormControl(this.data.image)
      })
    }
    if(!this.data){
      this.postForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl('',[Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl('')
      })
    }
  }

  get title(){
    return this.postForm.get('title')!
  }

  get description(){
    return this.postForm.get('description')!
  }

  onFileSelected(event: any){
    const image: File = event.target.files[0]
    this.postForm.patchValue({image: image})
  }
  submit(){
    if(this.postForm.invalid)
      return
    this.onSubmit.emit(this.postForm.value);
  }

}
