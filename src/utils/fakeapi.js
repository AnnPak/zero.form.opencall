export const data = [{
        "type": "high-poly",
        "display_title": "Upload a high-poly garment",
        "display_hint": "Submit your digital fashion piece here.\nDetailed requirements:\n<a href=\"https://platform.zero10.app\">https://platform.zero10.app</a>",
        "fields": [{
                "field_type": "text",
                "field_placeholder": 'Disappearing Pants',
                "field_name": "Item name",
                "display_title": "Name of the item",
                "display_description": "Tell us a little bit more about your work and the ideas behind it.",
                "display_hint": "<p>It will be used in the ZERO10 Platform listings</p>",
                "required": true,
            },

            {
                "field_type": "textarea",
                "field_placeholder": 'Add a description',
                "field_name": "Description",
                "display_title": "Describe the item",
                "display_description": "Whats's the name of the item?",
                "display_hint": "<p>Good description: \"This item is inspired by my grandmother's collection of antique rugs and the sunny spring days spent in her garden.\" <br><br>Bad description: \"short jacket\".</p>",
                "required": true,
            },
            {
                "field_type": "file",
                "field_name": "Hi-res preview",
                "display_title": "High-resolution preview",
                "display_description": "Static high-poly item on a transparent background.2000 × 2000 px PNG file (16- or 24-bit)",
                "display_hint": "<p>Garment project made in CLO or Marvelous</p>",
                "required": true,
            },
            {
                "field_type": "file",
                "field_name": "OBJ file link",
                "display_title": "OBJ file",
                "display_description": "OBJ file",
                "display_hint": ".obj file containing your non-garment wearable. These can include body modifications (like wings), experimental items and more",
                "required": false,
            },

            {
                "field_type": "file",
                "field_name": "ZPRJ file (3D Item) link",
                "display_title": "ZPRJ file (3D Item)",
                "display_description": ".obj file containing your non-garment wearable. These can include body modifications (like wings), experimental items and more",
                "display_hint": "*.ZPRJ file containing your item. Made in Marvelous Designer or CLO",
                "required": false,
            },

            {
                "field_type": "hidden",
                "field_name": "Submission type",
                "required": true,
                "value": "High-poly"
            },
            {
                "field_name": "Author",
                "field_type": "hidden",
                "required": true,
            }
        ]

    },
    {
        "type": "low-poly",
        "display_title": "Upload a LOW-poly garment",
        "display_hint": "Submit your digital fashion piece here.\nDetailed requirements:\n<a href=\"https://platform.zero10.app\">https://platform.zero10.app</a>",
        "fields": [{
                "field_type": "text",
                "field_placeholder": 'Disappearing Pants',
                "display_title": "Item name",
                "display_description": "Tell us a little bit more about your work and the ideas behind it.",
                "display_hint": "<p>It will be used in the ZERO10 Platform listings</p>",
                "required": true,
            },

            {
                "field_type": "textarea",
                "field_placeholder": 'Add a description',
                "display_title": "Description",
                "display_description": "Whats's the name of the item?",
                "display_hint": "<p>Good description: \"This item is inspired by my grandmother's collection of antique rugs and the sunny spring days spent in her garden.\" <br><br>Bad description: \"short jacket\".</p>",
                "required": true,
            },
            {
                "field_type": "file",
                "display_title": "Hi-res preview",
                "display_description": "Hi-res preview file",
                "display_hint": "<p>Garment project made in CLO or Marvelous</p>",
                "required": true,
            },
            {
                "display_title": "OBJ file link",
                "field_type": "file",
                "display_description": "OBJ file",
                "display_hint": ".obj file containing your non-garment wearable. These can include body modifications (like wings), experimental items and more",
                "required": false,
                "display": true,
            },

            {
                "display_title": "ZPRJ file (3D Item) link",
                "field_type": "file",
                "display_description": "ZPRJ file (3D Item)",
                "display_hint": "*.ZPRJ file containing your item. Made in Marvelous Designer or CLO",
                "required": false,
                "display": true,
            },

            {
                "field_type": "hidden",
                "field_name": "Submission type",
                "display_title": "Submission type",
                "required": true,
                "value": "High-poly"
            },
            {
                "display_title": 'Author',
                "field_name": "Author",
                "field_type": "hidden",
                "required": true,
                "display": false,
            }
        ]
    }
]