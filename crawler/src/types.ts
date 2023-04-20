export interface IArticleItem {
  title: string;
  href: string;
  done?: boolean;
}

export interface IMarkdownData {
  seriesNo: number,
  seriesTitle: string,
  title: string,
  sentences: Array<string>,
  metaData: IArticleItem
}
