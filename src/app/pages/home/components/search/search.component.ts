import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { debounceTime } from "rxjs";

@Component({
  selector: "poke-search",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss"
})
export class SearchComponent {
  form!: FormGroup;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _fb: FormBuilder) {
    this.buildData();
  }

  ngOnInit(): void {
    this.watchForm();
  }

  buildData(): void {
    this.form = this._fb.group({
      query: [""]
    });
  }

  watchForm(): void {
    this.form
      .get("query")
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe(() => this.submit());
  }

  submit(): void {
    this.onSearch.emit(this.form.get("query")?.value);
  }
}
