const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 1234;

const PHONE = "(509) 342-5082";
const BUSINESS_NAME = "Hiatt Services";

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

function getGalleryImages() {
  const galleryDir = path.join(__dirname, "public", "img", "gallery");

  try {
    const files = fs.readdirSync(galleryDir);

    // Only keep images
    const imageFiles = files
      .filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b)); // simple alphabetical

    return imageFiles;
  } catch (err) {
    console.error("Error reading gallery directory:", err);
    return [];
  }
}

// Homepage
app.get("/", (req, res) => {
  res.render("index", {
    phone: "(509) 342-5082",
    businessName: "Hiatt Services",
    tagline: "Building Better Outdoors Since 2012",
    heroSubtitle:
      "Tree removal, land clearing, excavation, demolition and more — serving the Inland Northwest with safe, clean, professional work.",
    services: [
      {
        icon: "🌲",
        title: "Tree Removal & Thinning",
        description:
          "Safe removal of hazardous trees, thinning, pruning, and stump grinding with minimal impact to surrounding structures."
      },
      {
        icon: "🚜",
        title: "Excavation & Site Prep",
        description:
          "Site grading, driveways, utility trenches and more to get your project ready for concrete, building, or landscaping."
      },
      {
        icon: "🗑️",
        title: "Dumpster Rental",
        description:
          "14 yard dumpster for rental. $300 + dump fees for a 5 day rental. Includes drop off and 1 disposal."
      },
      {
        icon: "🌿",
        title: "Landscaping & Clean-ups",
        description:
          "Brush removal, overgrowth clearing, and landscape improvements to give your property a clean, finished look."
      }
    ]
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    businessName: "Hiatt Services",
    phone: "(509) 342-5082",
    status: null
  });
});

// Contact form POST handler
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log("New message from contact form:");
  console.log({ name, email, phone, message });

  // TODO: send an email here (Mailgun, SMTP, etc.)
  // For now, just show success message.

  return res.render("contact", {
    businessName: "Hiatt Services",
    phone: "(509) 342-5082",
    status: "success"
  });
});

app.get("/gallery", (req, res) => {
  const images = getGalleryImages(); // ['job1.jpg', 'yard-after.webp', ...]

  res.render("gallery", {
    businessName: BUSINESS_NAME,
    phone: PHONE,
    images
  });
});

app.listen(PORT, () => {
  console.log(`Hiatt Services site running on port ${PORT}`);
});



