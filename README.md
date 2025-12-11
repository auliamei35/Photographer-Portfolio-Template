📸 ALEXANDER PHOTOGRAPHY: PREMIUM EDITORIAL PORTFOLIO TEMPLATE
A modern, high-performance photography portfolio website template built with Tailwind CSS and Vanilla JavaScript.
This template is perfect for photographers, designers, and creative professionals who want a bold, elegant, and visually striking showcase of their work.

✨ Key Features
- Responsive Dark-Mode Editorial Design: A minimalist, high-contrast aesthetic that elevates your photography.

- High-Performance Animations: Smooth Scroll Reveal (powered by Intersection Observer), Hero Parallax, and Typewriter effect for an immersive experience.

- Advanced Interactive Gallery: Fully featured Lightbox modal with keyboard navigation (Arrow Keys & ESC) and seamless transitions.

- Clean Code & Vanilla JS: No heavy JavaScript libraries (besides Tailwind and Iconify), ensuring fast load times.

- Ready-to-Use Contact Form: Includes validation and a mailto fallback for direct communication with clients.

🛠️ Technologies Used
- HTML5
- Tailwind CSS 3.x – for fast, utility-based styling
- Vanilla JavaScript – for all interactivity and animations
- Iconify / Lucide Icons – lightweight, accessible icon sets


📂 File Structure
The template uses a clean and logical directory structure for easy customization:
alexander-photography/
│── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── images/
    └── your portfolio images here


🚀 Installation & Setup
This template is a static website (HTML/CSS/JS), so setup is extremely simple:
1. Clone or Download the Repository
git clone [(https://github.com/auliamei35/Photographer-Portfolio-Template.git)]
cd alexander-photography
3. Add Your Images
Place all your portfolio images inside the images/ folder and match the filenames referenced in index.html.
4. Run the Website
Simply open index.html in your browser.
No server required.


⚙️ Customization
1. Colors & Typography
Colors (Tailwind Config):
To adjust the color palette, edit the <script> Tailwind config inside the <head> of index.html.
Modify the values under:
colors: { brand: { ... } }
Fonts:
Replace the Google Fonts <link> in the <head> with your preferred font.
2. Lightbox / Gallery Customization
To update gallery images, edit each gallery-item in index.html:
<div class="group relative overflow-hidden ... gallery-item" 
     data-src="images/high-res-new-photo.jpg"
     data-title="New Artwork Title"
     data-category="New Category">
     
    <img src="images/low-res-new-photo.jpg"
         alt="Image Description"
         class="...">
</div>


📩 IMPORTANT INFO: Contact Form Setup
Inside js/script.js (around line 150):
DISABLE this mailto fallback:
const mailtoLink = `mailto:contact@alexander.com...`;
window.location.href = mailtoLink;
ENABLE this Formspree integration and replace YOUR_ID:
fetch("https://formspree.io/f/YOUR_ID", {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
}).then(...);
