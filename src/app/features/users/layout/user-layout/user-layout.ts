import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHeader } from "../../shared/user-header/user-header";
import { UserFooter } from "../../shared/user-footer/user-footer";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, UserHeader, UserFooter],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {}
