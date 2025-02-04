import slugify from 'slugify';

interface ISlugOptions {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
}

export class StringUtil {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  generateSlug(options?: ISlugOptions) {
    const {
      replacement,
      remove,
      lower = true,
      strict = true,
      locale,
      trim = true,
    } = options || {};

    this.value = slugify(this.value, {
      replacement,
      remove,
      lower,
      strict,
      locale,
      trim,
    });

    return this;
  }

  getValue(): string {
    return this.value;
  }
}
