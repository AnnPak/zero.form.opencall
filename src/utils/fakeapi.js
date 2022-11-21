export const data = [
    {
        "type": "high-poly",
        "display_title": "Upload a high-poly garment",
        "display_description": "Submit your digital fashion piece here.\nDetailed requirements:\n<a href=\"https://platform.zero10.app\">https://platform.zero10.app</a>",
        "fields": [
            {
                "field_name":"Item name",
                "field_type": "text",
                "display_title": "Tell us a little bit more about your work and the ideas behind it.",
                "display_description": "It will be used in the ZERO10 Platform listings",
                "required": true,
                "display": true
            },

            {
                "field_name":"Describe the item",
                "field_type": "textarea",
                "display_title": "Whats's the name of the item?",
                "display_description": "Good description: \"This item is inspired by my grandmother's collection of antique rugs and the sunny spring days spent in her garden.\"Bad description: \"short jacket\".",
                "required": true,
                "display": true
            },

            {
                "field_name":"ZPRJ file (3D Item) link",
                "field_type": "file",
                "display_title": "ZPRJ file",
                "display_description": "Garment project made in CLO or Marvelous",
                "required": true,
                "display": true
            },
            {
                "field_type": "hidden",
                "field_name": "Submission type",
                "required": true,
                "display": false,
                "value": "high-poly"
            }
        ]
        
    },
    {
        "type": "low-poly"
    }
]
