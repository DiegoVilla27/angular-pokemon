import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, PagesRoutingModule]
})
export class PagesModule {}
