import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { Post } from 'src/models/post';
import { PostService } from '../services/post.service';
@Component({
    selector: 'app-upload-cv',
    templateUrl: './upload-cv.component.html',
    styleUrls: ['./upload-cv.component.css']
})
export class UploadCVComponent implements OnInit {
    csvFile = "";
    input: any;
    posts: any;


    public records: any[] = [];
    @ViewChild('csvReader') csvReader: any;
    uploadListener($event: any) {
        let text = [];
        let files = $event.srcElement.files;
        this.csvFile = files;
        this.input = $event;
    }
    constructor(private postService: PostService) { }

    ngOnInit(): void {

    }

    onUpload() {
        if (this.isValidCSVFile(this.csvFile[0])) {
            let input = this.input.target;
            let reader = new FileReader();
            reader.readAsText(input.files[0]);
            reader.onload = () => {
                let i = 0;
                let csvData = reader.result;
                let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
                let headersRow = this.getHeaderArray(csvRecordsArray);
                this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
                ;
                for (i = 0; i < this.records.length; i++) {
                    this.postService.createPost(
                        {
                            "data": {
                                PostTitle: this.records[i].PostTitle,
                                PostDescription: this.records[i].PostDescription
                            }
                        }).subscribe((data: any) => {
                        });
                }

            };
            reader.onerror = function () {
                console.log('error is occured while reading file!');
            };
        } else {
            alert("Please import valid .csv file.");
            this.fileReset();
        }
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
        let csvArr = [];
        for (let i = 1; i < csvRecordsArray.length; i++) {
            let curruntRecord = (<string>csvRecordsArray[i]).split(',');
            if (curruntRecord.length == headerLength) {
                let csvRecord: Post = new Post();
                csvRecord.PostTitle = curruntRecord[0].trim();
                csvRecord.PostDescription = curruntRecord[1].trim();
                csvArr.push(csvRecord);
            }
        }
        return csvArr;
    }

    isValidCSVFile(file: any) {
        return file.name.endsWith(".csv");
    }

    getHeaderArray(csvRecordsArr: any) {
        let headers = (<string>csvRecordsArr[0]).split(',');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    fileReset() {
        this.csvReader.nativeElement.value = "";
        this.records = [];
    }

}
