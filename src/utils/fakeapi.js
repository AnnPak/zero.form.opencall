export const data = [
    {
        "type": "high-poly",
        "display_title": "Upload a high-poly garment",
        "display_description": "Submit your digital fashion piece here.\nDetailed requirements:\n<a href=\"https://platform.zero10.app\">https://platform.zero10.app</a>",
        "fields": [
            {
                "field_name":"name",
                "field_type": "text",
                "field_placeholder": 'Disappearing Pants',
                "display_title": "Item name",
                "display_subtitle":"Tell us a little bit more about your work and the ideas behind it.",
                "display_description": "<p>It will be used in the ZERO10 Platform listings</p>",
                "required": true,
            },

            {
                "field_name":"description",
                "field_type": "textarea",
                "field_placeholder": 'Add a description',
                "display_title": "Describe the item",
                "display_subtitle": "Whats's the name of the item?",
                "display_description": "<p>Good description: \"This item is inspired by my grandmother's collection of antique rugs and the sunny spring days spent in her garden.\" <br><br>Bad description: \"short jacket\".</p>",
                "required": true,
            },

            {
                "field_name":"3ditem",
                "field_type": "file",
                "display_title": "ZPRJ file (3D Item) link",
                "display_subtitle": "ZPRJ file",
                "display_description": "<p>Garment project made in CLO or Marvelous</p>",
                "required": true,
            },
            {
                "field_type": "hidden",
                "field_name": "Submission type",
                "required": true,
                "value": "high-poly"
            }
        ]
        
    },
    {
        "type": "low-poly"
    }
]
