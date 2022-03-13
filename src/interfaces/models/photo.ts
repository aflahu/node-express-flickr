export interface Medias {
  m: string;
}

export interface IPhoto {
  title: string;
  link: string;
  media: Medias[];
  date_taken: string;
  description: string;
  published: string;
  author: string;
  author_id: string;
  tags: string;
}