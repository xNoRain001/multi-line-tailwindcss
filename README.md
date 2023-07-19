## Overview

After `prettier-plugin-tailwindcss` formats tailwindcss class names, always 
keep a line of code, I can't read it.

## Installation

```
npm i multi-line-tailwindcss -g
```

## Usage

```
cd ./project
multi-line-tailwindcss
```

## Example

This is source code.

```html
<div class="w-full h-full border-[1px] border-solid border-blue-500 cursor-pointer flex justify-between items-center"></div>
```

After prettier-plugin-tailwindcss formats it.

```html
<div
  class="flex h-full w-full cursor-pointer items-center justify-between border-[1px] border-solid border-blue-500"
></div>
```

And run `multi-line-tailwindcss`.

```html
<div
  class="
    flex h-full w-full cursor-pointer items-center justify-between
    border-[1px] border-solid border-blue-500
  "
></div>
```

## Options

```
multi-line-tailwindcss --max-length 80 --tab-length 2
```
