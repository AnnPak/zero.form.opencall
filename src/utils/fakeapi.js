export const data = {
    "forms": {
        "high-poly": {
            "display_title": "Upload a high-poly garment",
            "display_description": "Submit your digital fashion piece here.\nDetailed requirements:\n<a href=\"https://platform.zero10.app\">https://platform.zero10.app</a>",
            "fields": {
                "Item name": {
                    "field_type": "text",
                    "display_title": "Whats's the name of the item?",
                    "display_description": "It will be used in the ZERO10 Platform listings",
                    "required": true,
                    "display": true
                },

                "ZPRJ file (3D Item) link": {
                    "field_type": "file",
                    "display_title": "ZPRJ file",
                    "display_description": "Garment project made in CLO or Marvelous",
                    "required": true,
                    "display": true
                },
                "Submission type": {
                    "required": true,
                    "display": false,
                    "value": "high-poly"
                }
            }
        },
        "low-poly": {}
    }
}
