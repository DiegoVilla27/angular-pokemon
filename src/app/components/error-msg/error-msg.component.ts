import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

export type IErrorMsg = { [key: string]: IValidation[] };

interface IValidation {
  type: string;
  message: string;
}

@Component({
  selector: "poke-error-msg",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./error-msg.component.html",
  styleUrl: "./error-msg.component.scss"
})
export class ErrorMsgComponent {
  @Input() form!: FormGroup;
  @Input() list!: IValidation[];
  @Input() type!: string;

  hasError(errorType: string): boolean {
    const control = this.findControl(this.form, this.type);
    return Boolean(
      control?.hasError(errorType) && (control.dirty || control.touched)
    );
  }

  private findControl(
    control: AbstractControl,
    path: string
  ): AbstractControl | null {
    const paths = path.split(".");
    let currentControl: AbstractControl | null = control;

    for (const p of paths) {
      if (currentControl instanceof FormGroup) {
        currentControl = currentControl.get(p);
      } else {
        return null;
      }
    }
    return currentControl;
  }
}
