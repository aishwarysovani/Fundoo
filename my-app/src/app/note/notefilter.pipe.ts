import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notefilter'
})
export class NotefilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   
    if (!args) return value;
    return value.filter(items => {
    return (
    items.note.includes(args) == true || items.title.includes(args) == true
    );
    });
    }

}

