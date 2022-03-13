import axios from "axios";
import { IPhoto } from "../../interfaces/models/photo";
import Photo, { IPhotoModel } from "../../models/Photo";
import Locals from "../../providers/Locals";

class PublicPhotos {
  public static async index(req, res, next): Promise<any> {
    let skip: number = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit: number = req.query.limit ? parseInt(req.query.limit) : 5;
    let tags: string = req.query.tag;
    try {
      // req to flickr api
      const flickrFeed = await axios.get(Locals.config().flickrApi, {
        params: { tags },
      });
      const flickrFeedData = JSON.parse(
        flickrFeed.data.substring(
          flickrFeed.data.indexOf("(") + 1,
          flickrFeed.data.lastIndexOf(")")
        )
      );

      const data = flickrFeedData.items.map((item: any) => {
        return new Photo({
          title: item.title,
          link: item.link,
          media: item.media,
          date_taken: item.date_taken,
          description: item.description,
          published: item.published,
          author: item.author,
          author_id: item.author_id,
          tags: item.tags,
        });
      });

      // save if not duplicate
      data.forEach(async (item: IPhotoModel) => {
        const photo: IPhoto = await Photo.findOne({ link: item.link });
        if (!photo) {
          // TODO: Optimize with promiseAll
          await item.save();
        }
      });

      const filter = (tags: string) => {
        if (tags) {
          return { tags: { $regex: ".*" + tags + ".*" } };
        }
        return {};
      };

      const doc: IPhotoModel[] = await Photo.find(
        filter(tags),
        {},
        { skip, limit, sort: { published: -1 } }
      );

      const count: number = await Photo.count({});
      return res.json({
        data: doc,
        count,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  }
}

export default PublicPhotos;
