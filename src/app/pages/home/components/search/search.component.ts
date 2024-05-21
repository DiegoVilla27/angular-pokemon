import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { debounceTime } from "rxjs";
import { ErrorMsgComponent } from "../../../../components/error-msg/error-msg.component";
import { validations } from "./validations";

@Component({
  selector: "poke-search",
  standalone: true,
  imports: [CommonModule, ErrorMsgComponent, FormsModule, ReactiveFormsModule],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss"
})
export class SearchComponent {
  form!: FormGroup;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  // ICONS
  ICON_SEARCH: string = "assets/icons/search.svg";

  // VALIDATIONS
  validations = validations;

  constructor(private _fb: FormBuilder) {
    this.buildData();
  }

  ngOnInit(): void {
    this.watchForm();
  }

  buildData(): void {
    this.form = this._fb.group({
      query: ["", Validators.maxLength(50)]
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
