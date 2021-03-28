import React from "react"
import PropTypes from "prop-types"
import defaultImage from "../images/No_picture_available.png"
import { Link } from "react-router-dom"

const BoxContent = ({ trip }) => {
    const {
        title = "",
        url = "",
        description = "",
        photos = [],
        tags = [],
    } = trip
    const main_photo = photos[0] ?? defaultImage // checking if photos doesn't exist, it will replace by default image instead.
    const detial_photo_1 = photos[1] ?? defaultImage
    const detial_photo_2 = photos[2] ?? defaultImage
    const detial_photo_3 = photos[3] ?? defaultImage

    const splitDescript = (text, index, arr) => {
        const lastIndex = arr.length - 1
        return (
            <span key={index}>
                {text}
                {index !== lastIndex ? <br /> : null}
            </span>
        )
    } // split \n from description and last index will not push <br />.

    const substringText = (text, limit) => {
        return text.substring(0, limit)
    }

    const tagsHandle = (tag, index, arr) => {
        const beforeLast = arr.length - 2 > -1 ? true : false // before last. index must have 2 items at least
        if (beforeLast && index === arr.length - 2) {
            // set "and" before last item and it won't set when only have one item.
            return (
                <span key={index}>
                    <Link
                        className="grayText hoverText"
                        to={`/trips?keyword=${tag}`}
                    >
                        {tag}
                    </Link>
                    {" และ "}
                </span>
            )
        } else {
            // normal render
            return (
                <span key={index}>
                    <Link
                        className="grayText hoverText"
                        to={`/trips?keyword=${tag}`}
                    >
                        {tag}
                    </Link>{" "}
                </span>
            )
        } //
    }

    return (
        <div className="card">
            <div className="main-img-box">
                {<img className="main-img" src={main_photo} alt="mainImage" />}
            </div>

            <div className="info-card">
                <div className="title-box">
                    <a className="title" href={url}>
                        {title}
                    </a>
                </div>

                <div className="descript grayText">
                    <p>
                        {
                            substringText(description, 200)
                                .split("\n")
                                .map(
                                    splitDescript
                                ) /*limit description 200 characters*/
                        }
                        <span>
                            {" .... "}
                            <a className="dogeText hoverText" href={url}>
                                อ่านต่อ
                            </a>
                        </span>
                    </p>
                </div>

                <div className="tag">
                    <p className="grayText">หมวด: {tags.map(tagsHandle)}</p>
                </div>

                <div className="img-info-container">
                    <img
                        className="img-info"
                        src={detial_photo_1}
                        alt="imgeDetail"
                    />
                    <img
                        className="img-info"
                        src={detial_photo_2}
                        alt="imgeDetail"
                    />
                    <img
                        className="img-info"
                        src={detial_photo_3}
                        alt="imgeDetail"
                    />
                </div>
            </div>
        </div>
    )
}

BoxContent.propTypes = {
    trip: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        photos: PropTypes.array.isRequired,
    }).isRequired,
} // checked prop types, they must be correct type.

export default BoxContent
