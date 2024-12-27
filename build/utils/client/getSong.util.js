var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import Song from "../../models/song.model.js";
import Artist from "../../models/artist.model.js";
export const getFullSongs = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield Song.find({ status: "active", deleted: false });
    for (const song of songs) {
      const artist = yield Artist.findOne({
        _id: song.artist,
        status: "active",
        deleted: false,
      });
      song["artistFullName"] =
        (artist === null || artist === void 0 ? void 0 : artist.fullName) ||
        "Unknown Artist";
    }
    return songs;
  });
