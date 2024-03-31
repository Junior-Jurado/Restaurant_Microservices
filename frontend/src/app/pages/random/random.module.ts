import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './random.component';

@NgModule({
  declarations: [RandomComponent],
  imports: [CommonModule, RandomRoutingModule, FormsModule],
})
export class RandomModule {}
