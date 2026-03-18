import path from "node:path";
import { DateTime } from "luxon";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";
import * as sass from "sass";

import getTagList from "./_11ty/getTagList.js";

export default function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");

  eleventyConfig.addCollection("tagList", getTagList);

  eleventyConfig.addPassthroughCopy("src/assets");

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addFilter("ymd", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "yyyy/MM/dd"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("year", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy");
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("console", (value) => {
    return JSON.stringify(value);
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(syntaxHighlight, {
    templateFormats: ["md"],
    init: function ({ Prism }) {
      // Add your own custom language to Prism!
    },
  });

  // SASS compilation via custom template extension
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);

      // Skip partials (files starting with _)
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
        sourceMap: false,
      });

      this.addDependencies(inputPath, result.loadedUrls);

      return async () => {
        return result.css;
      };
    },
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
