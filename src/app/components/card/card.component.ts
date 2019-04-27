import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: 'card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class Card implements OnInit {
	// @Input() cardDetails: any;

	private title: string;
	private buttons: Array<any>

	constructor() { 
	}

	ngOnInit() {
		this.title = 'Card 1';
		this.buttons = [
			{
				text: '0',
				icon: '',
				color: 'btn-success',
				action: null
			},
			{
				text: '1',
				icon: '',
				color: 'btn-default',
				action: null
			},
			{
				text: '2',
				icon: '',
				color: 'btn-warning',
				action: null
			},
			{
				text: '3',
				icon: '',
				color: 'btn-danger',
				action: null
			}
		];
	}
}