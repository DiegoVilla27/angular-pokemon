import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "poke-error-msg",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./error-msg.component.html",
  styleUrl: "./error-msg.component.scss"
})
export class ErrorMsgComponent {
  @Input() form!: FormGroup;
  @Input() list!: { type: string; message: string }[];
  @Input() type!: string;
}
