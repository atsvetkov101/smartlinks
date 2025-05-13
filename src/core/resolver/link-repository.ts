export class LinkRepository{
  findOne: ( path:string ) => Promise<Rule[]> 
}