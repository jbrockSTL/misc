import { Component, Input, Output, EventEmitter } from '@angular/core'
import { SurveyService } from '../../services'
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms'
import { Router } from '@angular/router'
import { Survey } from 'src/app/services/survey.service'

@Component({
  selector: 'app-survey-builder-page',
  templateUrl: './survey-builder-page.component.html',
  styleUrls: ['./survey-builder-page.component.scss'],
})
export class SurveyBuilderPageComponent {
  @Input()
  get survey() {
    return this._survey
  }
  set survey(value: Survey) {
    this._survey = value
    const survey: Survey = value || {
      id: null,
      title: '',
      subtitle: '',
      questions: [
        {
          code: '',
          category: '',
          title: '',
          text: '',
          type: '',
          date: '',
        },
      ],
    }

    this.form = this.formBuilder.group({
      title: [survey.title, Validators.required],
      subtitle: [survey.subtitle, Validators.required],
      questions: this.formBuilder.array(
        survey.questions.map((question) =>
          this.formBuilder.group({
            code: [question.code],
            category: [question.category, Validators.required],
            title: [question.title],
            text: [question.text, Validators.required],
            type: [question.type],
            date: [question.date],
          })
        )
      ),
    })
  }
  @Output() save = new EventEmitter()

  _survey: Survey

  constructor(
    private formBuilder: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  form: FormGroup

  private newQuestionFormGroup(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      category: ['', Validators.required],
    })
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(
        this.survey.id
          ? { ...this.form.value, id: this.survey.id }
          : this.form.value
      )
    }
  }
  handleAddNewQuestion() {
    const questions = this.form.get('questions') as FormArray
    this.insertQuestion(questions.controls.length)
  }

  private insertQuestion(index: number) {
    const questions = this.form.get('questions') as FormArray
    questions.insert(index, this.newQuestionFormGroup())
  }

  get questions(): AbstractControl[] {
    return (this.form.get('questions') as FormArray).controls
  }

  handleDeleteQuestion(index: number) {
    const questions = this.form.get('questions') as FormArray
    questions.removeAt(index)
  }

  handleInsertAfterQuestion(event: Event, index: number) {
    event.stopPropagation()
    this.insertQuestion(index + 1)
  }

  handleInsertBeforeQuestion(event: Event, index: number) {
    event.stopPropagation()
    this.insertQuestion(index)
  }
}
