
export const StockMaintainence =
    [
        {
            "Name": "Part Number",
            "Description": "A unique identifier for each item, often used for quick reference.",
            "DataType": "text",
            "IsSelected": true,
            "IsActionField": false,
        },
        {
            "Name": "Unit Of Measure",
            "Description": "The unit in which the item is measured or counted (e.g., pieces, kilograms, liters).",
            "DataType": "text",
            "IsSelected": true,
            "IsActionField": false,
        },
        {
            "Name": "Color",
            "Description": "Color fields in art are large, unbroken expanses of solid color that emphasize the emotional and sensory impact of color itself.",
            "DataType": "text",
            "IsSelected": true,
        },
        {
            "Name": "Model Number",
            "Description": "A model number field is a designated alphanumeric code or identifier used to distinguish and catalog specific versions or variations of a product or item.",
            "DataType": "text",
            "IsSelected": true,
        },
        {
            "Name": "Brand",
            "Description": "The brand field encompasses the strategies and elements that businesses use to create a distinct and recognizable identity for their products or services.",
            "DataType": "text",
            "IsSelected": true,
        },
        {
            "Name": "Size",
            "Description": "Size fields are data input areas that collect information related to the physical dimensions of objects, products, or items, often used in inventory management, e-commerce, and manufacturing.",
            "DataType": "number",
            "IsSelected": true,
        },
        {
            "Name": "Manufacturer",
            "Description": "Manufacturers fields are sections of data used to record information about the companies or organizations responsible for producing various products, allowing for efficient tracking and management of product sources.",
            "DataType": "text",
            "IsSelected": true,
        },
        {
            "Name": "Asset Number",
            "Description": "An asset number is a unique identifier assigned to individual assets, facilitating their tracking, management, and organization within an inventory or asset management system.",
            "DataType": "text",
            "IsSelected": true,
        },
        {
            "Name": "Minimum Stock Level",
            "Description": "The minimum quantity that should trigger a reorder.",
            "DataType": "Number",
            "IsSelected": true,
            "IsActionField": false,
        },
        {
            "Name": "Maximum Stock Level",
            "Description": "The maximum quantity that should be kept in stock.",
            "DataType": "Number",
            "IsSelected": true,
            "IsActionField": false,
        },

        {
            "Name": "Lead Time",
            "Description": "The time it takes to receive a new order once it's placed.",
            "DataType": "time",
            "IsSelected": true,
            "IsActionField": false,
        },
        {
            "Name": "Selling Price",
            "Description": "The price at which you sell the item to customers.",
            "DataType": "Number",
            "IsSelected": true,
            "IsActionField": true,
        },
        {
            "Name": "Supplier Information",
            "Description": "Details about the supplier, including contact information.",
            "DataType": "text",
            "IsSelected": true,
            "IsActionField": true,
        },

        {
            "Name": "Date Of Purchase",
            "Description": "The date when the item was acquired.",
            "DataType": "date",
            "IsSelected": true,
            "IsActionField": true,
        },
        {
            "Name": "Batch Serial Number",
            "Description": "If applicable, a unique identifier for items within a batch or serial number for traceability.",
            "DataType": "text",
            "IsSelected": true,
            "IsActionField": true,
        },
        {
            "Name": "Expiry Date",
            "Description": "The date when the item should no longer be used or sold.",
            "DataType": "date",
            "IsSelected": true,
            "IsActionField": false,
        },
        {
            "Name": "Quality Control Information",
            "Description": "Details about quality checks, inspections, or quality-related information.",
            "DataType": "text",
            "IsSelected": true,
            "IsActionField": false,
        },
    ]

export const AssestTracking = [

    {
        "Name": "Serial Number",
        "Description": "A unique serial number associated with the asset for tracking and identification.",
        "DataType": "text",
        "IsSelected": true,
        "IsActionField": false,
    },
    {
        "Name": "Acquisition Date",
        "Description": "The date when the asset was acquired or purchased.",
        "DataType": "date",
        "IsSelected": true,
        "IsActionField": true,
    },
    {
        "Name": "Color",
        "Description": "Color fields in art are large, unbroken expanses of solid color that emphasize the emotional and sensory impact of color itself.",
        "DataType": "text",
        "IsSelected": true,
    },
    {
        "Name": "Vendor",
        "Description": "The vendor field contains information about the suppliers or sellers of products, helping businesses manage their relationships and transactions with external sources.",
        "DataType": "text",
        "IsSelected": true,
    },
    {
        "Name": "Model Number",
        "Description": "A model number field is a designated alphanumeric code or identifier used to distinguish and catalog specific versions or variations of a product or item.",
        "DataType": "text",
        "IsSelected": true,
    },
    {
        "Name": "Brand",
        "Description": "The brand field encompasses the strategies and elements that businesses use to create a distinct and recognizable identity for their products or services.",
        "DataType": "text",
        "IsSelected": true,
    },
    {
        "Name": "Size",
        "Description": "Size fields are data input areas that collect information related to the physical dimensions of objects, products, or items, often used in inventory management, e-commerce, and manufacturing.",
        "DataType": "number",
        "IsSelected": true,
    },
    {
        "Name": "Asset Number",
        "Description": "An asset number is a unique identifier assigned to individual assets, facilitating their tracking, management, and organization within an inventory or asset management system.",
        "DataType": "text",
        "IsSelected": true,
    },
    {
        "Name": "Purchase Price",
        "Description": "The cost of acquiring the asset.",
        "DataType": "Number",
        "IsSelected": true,
        "IsActionField": true,
    },
    {
        "Name": "Assigned To",
        "Description": "The individual or department responsible for the asset or its current user.",
        "DataType": "text",
        "IsSelected": true
    },
    {
        "Name": "Date of Assignment",
        "Description": "The date when the asset was assigned to a user or department.",
        "DataType": "date",
        "IsSelected": true,
        "IsActionField": true,
    },
    {
        "Name": "Status",
        "Description": "The status of the asset (e.g., in use, in maintenance, retired).",
        "DataType": "text",
        "IsSelected": true,
        "IsActionField": true,
    },
    {
        "Name": "Warranty Information",
        "Description": "Details about the asset's warranty, including warranty period and contact information for warranty claims.",
        "DataType": "text",
        "IsSelected": true,
        "IsActionField": false,
    },
    {
        "Name": "Maintenance History",
        "Description": "A record of maintenance activities, including maintenance dates, descriptions, and costs.",
        "DataType": "text",
        "IsSelected": true,
        "IsActionField": true,
    },
    {
        "Name": "Calibration/Service Due Date",
        "Description": "The date when the asset requires calibration or servicing.",
        "DataType": "date",
        "IsSelected": true,
        "IsActionField": true,
    },
    {
        "Name": "Disposal/Retirement Date",
        "Description": "The date when the asset was retired or disposed of.",
        "DataType": "date",
        "IsSelected": true,
        "IsActionField": true,
    },
    {
        "Name": "Supplier Information",
        "Description": "Details about the supplier or vendor that provided the asset.",
        "DataType": "text",
        "IsSelected": true,
        "IsActionField": true,
    },

    {
        "Name": "Documentation",
        "Description": "Attachments or links to user manuals and documentation for the asset.",
        "DataType": "file",
        "IsSelected": true,
        "IsActionField": false,
    },
]




