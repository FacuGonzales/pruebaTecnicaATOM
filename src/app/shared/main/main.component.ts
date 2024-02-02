import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { MOCK_ERROR_GET_DATA } from '../utils/constants';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  textsObject: any = {};
  errorGetData: boolean = false;
  errorMessage = MOCK_ERROR_GET_DATA;

  constructor(private mainData: MainService) {
    this.getDataMain();
  }

  private getDataMain(): void {
    this.mainData.getMainData().subscribe({
			next: _respuesta => this.textsObject = _respuesta ? _respuesta : throwError,
			error: error => this.errorGetData = true
		});
  }

}
