import { Component,ViewChild,OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts:any=[];
  search:String =" ";
  dataSource:any;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private postService:PostService,private router:Router) { }
  ngOnInit(): void {
  this.loadPosts();
  }
  
  displayedColumns: string[] = ['id','PostTitle','PostDescription','Modification'];
 
  // Get post list
   async loadPosts() {
    return await this.postService.getAllPosts().subscribe((data: any) => {
     this.posts=data.data
    this.dataSource = new MatTableDataSource(this.posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item:any, property:any) => {
      switch(property) {
        case 'PostTitle': return item.attributes.PostTitle;
        case 'PostDescription': return item.attributes.PostDescription;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  })
}

onUpdate(id:any){
  this.router.navigate(['/post/create'], { queryParams: { postId: id } });
}

onDelete(id:any){
 
  if (window.confirm('Are you sure, you want to delete?')) {
    this.postService.deletePost(id).subscribe((data) => {
      this.loadPosts();
    });
  }
}

downloadCV(){
  let data, filename, link;

  let csv = this.convertArrayOfObjectsToCSV({
    data: this.posts.filter((e: any) => {
    return e.attributes.PostTitle.includes(this.search) || e.attributes.PostDescription.includes(this.search);
  })
  });
  if (csv == null) return;

  filename =  'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);
  console.log(data)
  link = document.createElement('a'); 0
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

convertArrayOfObjectsToCSV(args: any) {
  let data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  const csvString = [
    [
      "Title",
      "Description",
    ],
    ...data.map((item: any) => [
      `"${item.attributes.PostTitle}"`,
      `"${item.attributes.PostDescription}"`,
    ])
  ]
    .map(e => e.join(","))
    .join("\n");
  return csvString
}

applyFilter() {

  let result = this.posts.filter((e: any) => {
    return e.attributes.PostTitle.trim().toLowerCase().includes(this.search.trim().toLowerCase()) || e.attributes.PostDescription.trim().toLowerCase().includes(this.search.trim().toLowerCase());
  });
  this.dataSource = new MatTableDataSource(result);
  this.dataSource.paginator = this.paginator;
  }

}
