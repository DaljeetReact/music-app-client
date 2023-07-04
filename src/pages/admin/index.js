export {default as Dashboard} from "./Dashboard";
export {default as Home} from "./Home"
export {default as Songs} from "./Songs"
export {default as Users} from "./Users"
export {default as Artists} from "./Artists"
export {default as Albums} from "./Albums"
export {default as NewSong} from "./NewSong"

export const filtersInit = {
    Artist: "",
    Album: "",
    Language: "",
    Category: ""
};

export const Categories = [
    { _id: 2, name: "Jasp", value: "jasp" },
    { _id: 3, name: "Rock", value: "rock" },
    { _id: 4, name: "Melody", value: "melody" },
    { _id: 5, name: "Karoke", value: "karoke" },
    ];
    
     
export const languages = [
    { _id: 1, name: "Tamil", value: "tamil" },
    { _id: 2, name: "English", value: "english" },
    { _id: 4, name: "Telungu", value: "telungu" },
    { _id: 5, name: "Hindi", value: "hindi" },
    { _id: 6, name: "Punjabi", value: "punjabi" },
    { _id: 7, name: "Italian", value: "italian" },
];

export const responsiveSettings = [
    {
        breakpoint: 800,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay:true,
            Infinity:true
        }
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay:true

        }
    }
];