import { Component } from "@angular/core";
import { ConfirmationService } from "primeng/api";

@Component({
    selector: "article-list",
    templateUrl: "./article-list.component.html",
    styleUrls: ["article-list.component.css"],
    providers: [ConfirmationService]
})
export class ArticleListComponent {

    first = 0;
    rows = 10;
    position!: string

    constructor(private confirmationService: ConfirmationService) { }

    articles: any = [
        {
            no: "1",
            title: "How to create a UX case study without an experience",
            content: "lorem ipsum",
        }
    ]

    clickConfirmDelete(position: string) {
        this.position = position
        this.confirmationService.confirm({
            message: 'Do you want to delete this Article?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: "positionDialog"
        });
    }
}