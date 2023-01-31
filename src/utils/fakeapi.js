export const data = [{
        "type": "high-poly",
        "display_title": "Upload a high-poly garment",
        "display_description": "Submit your digital fashion piece here.\nDetailed requirements:\n<a href=\"https://platform.zero10.app\">https://platform.zero10.app</a>",
        "fields": [{
                "field_type": "text",
                "field_placeholder": 'Disappearing Pants',
                "display_title": "Item name",
                "display_subtitle": "Tell us a little bit more about your work and the ideas behind it.",
                "display_description": "<p>It will be used in the ZERO10 Platform listings</p>",
                "required": true,
            },

            {
                "field_type": "textarea",
                "field_placeholder": 'Add a description',
                "display_title": "Description",
                "display_subtitle": "Whats's the name of the item?",
                "display_description": "<p>Good description: \"This item is inspired by my grandmother's collection of antique rugs and the sunny spring days spent in her garden.\" <br><br>Bad description: \"short jacket\".</p>",
                "required": true,
            },
            {
                "field_type": "file",
                "display_title": "Hi-res preview",
                "display_subtitle": "Hi-res preview file",
                "display_description": "<p>Garment project made in CLO or Marvelous</p>",
                "required": true,
            },
            {
                "display_title": "OBJ file link",
                "field_type": "file",
                "display_subtitle": "OBJ file",
                "display_description": ".obj file containing your non-garment wearable. These can include body modifications (like wings), experimental items and more",
                "required": false,
                "display": true,
            },

            {
                "display_title": "ZPRJ file (3D Item) link",
                "field_type": "file",
                "display_subtitle": "ZPRJ file (3D Item)",
                "display_description": "*.ZPRJ file containing your item. Made in Marvelous Designer or CLO",
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

    },
    {
        "type": "low-poly",
        "display_title": "Upload a LOW-poly garment",
        "display_description": "Submit your digital fashion piece here.\nDetailed requirements:\n<a href=\"https://platform.zero10.app\">https://platform.zero10.app</a>",
        "fields": [{
                "field_type": "text",
                "field_placeholder": 'Disappearing Pants',
                "display_title": "Item name",
                "display_subtitle": "Tell us a little bit more about your work and the ideas behind it.",
                "display_description": "<p>It will be used in the ZERO10 Platform listings</p>",
                "required": true,
            },

            {
                "field_type": "textarea",
                "field_placeholder": 'Add a description',
                "display_title": "Description",
                "display_subtitle": "Whats's the name of the item?",
                "display_description": "<p>Good description: \"This item is inspired by my grandmother's collection of antique rugs and the sunny spring days spent in her garden.\" <br><br>Bad description: \"short jacket\".</p>",
                "required": true,
            },
            {
                "field_type": "file",
                "display_title": "Hi-res preview",
                "display_subtitle": "Hi-res preview file",
                "display_description": "<p>Garment project made in CLO or Marvelous</p>",
                "required": true,
            },
            {
                "display_title": "OBJ file link",
                "field_type": "file",
                "display_subtitle": "OBJ file",
                "display_description": ".obj file containing your non-garment wearable. These can include body modifications (like wings), experimental items and more",
                "required": false,
                "display": true,
            },

            {
                "display_title": "ZPRJ file (3D Item) link",
                "field_type": "file",
                "display_subtitle": "ZPRJ file (3D Item)",
                "display_description": "*.ZPRJ file containing your item. Made in Marvelous Designer or CLO",
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