# Quoteful

## Description
A website to explore and create your own thoughtful quotes. Write your own, or use AI to generate a quote based on your prompt.

## Dev Notes
This was my first time styling a website with TailwindCSS. While it lacks media queries, this project was a valuable learning experience. I realized that a mobile-first approach works best for me, allowing me to scale up to larger screen sizes more efficiently.

Although the styling isn’t my strongest work, I believe the real strength of this project lies in the backend and logic I implemented. If you’d like to see how my TailwindCSS skills have improved, check out my later projects, such as [Stellabyte](https://stellabyte-production.up.railway.app), a cloud storage application, or my portfolio at [zvkubajak.dev](https://zvkubajak.dev).

## Table of Contents
- [Usage](#usage)
- [Installation](#installation)
- [Questions](#questions)
- [Credits](#credits)

## Usage
Checkout the deployed site at [https://stellabyte-production.up.railway.app](https://stellabyte-production.up.railway.app). Users can  view and generate quotes with AI, but will need to create an account to publish quotes of their own.

Each quote has the option to contain a tag. Tags can be used to describe the quote in one word, and is useful to include for better searchability and generating precise AI quotes.

## Installation
Requirements:
* npm v10.9.2
* MongoDB Database URL
* JWT Secret Key
* OpenAI API Key

To install the source code for **Quoteful**, clone the repository locally using `git clone git@github.com:ZVKubajak/Quoteful.git` and navigate to the project directory with `cd Quoteful`.

Install all dependencies by running `npm run install`. Navigate to the server with `cd server`, and create a .env file with variables `DATABASE_URL`, `JWT_SECRET_KEY`, and `OPENAI_API_KEY`. Add the requirements respectively.

Navigate back to the root of the project with `cd ..`, and start the development server with `npm run start:dev`. You're now ready to explore and use the app locally!

## Questions
If you have any questions, you can reach out to me at [zvkubajak@gmail.com](mailto:zvkubajak@gmail.com). You can also find more of my work at [ZVKubajak](https://github.com/ZVKubajak) on Github, or through my portfolio, [zvkubajak.dev](https://zvkubajak.dev).

## Credits
Created by Zander Kubajak.

- Email: [zvkubajak@gmail.com](mailto:zvkubajak@gmail.com)
- Portfolio: [zvkubajak.dev](https://zvkubajak.dev)
- GitHub: [ZVKubajak](https://github.com/ZVKubajak)
- LinkedIn: [Zander Kubajak](https://www.linkedin.com/in/zander-kubajak-b37792335/)

© 2025 Zander Kubajak. All rights reserved.
