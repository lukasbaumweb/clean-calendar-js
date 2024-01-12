[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# Clean Calendar JS (WORK IN PROGRESS)

A simple and clean library for display events in a responsive and minimalistic calendar.

## Features

- Lightweight
- Display (multiple) Events (per day)

## Installation

Install clean-calendar-js with npm

```bash
  npm i clean-calendar-js
```
    
## Usage/Examples


```javascript
import { CleanCalendarJS } from 'clean-calendar-js';

const calendar = new CleanCalendarJS('#calendar');
calendar.init()
```

### Browser
```javascript

const calendar = new CleanCalendarJS('#calendar');
calendar.init()
```


## Deployment

To deploy this project run

```bash
  npm run build
```


## Roadmap

- [ ] Year View
- [ ] Add more integrations
- [ ] Booking functionality
  - [ ] Make booking functionality optional (plugin)
- [ ] Load events with ajax
- [ ] Expose events like onChangeMonth
- [ ] Custom Loader
- [ ] Additional browser support
- [ ] Day View
- [ ] Week View


## Authors

- [@lukasbaumweb](https://www.github.com/lukasbaumweb)


## License

MIT License

Copyright (c) 2024 Lukas Baum

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.