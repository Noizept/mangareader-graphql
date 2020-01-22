import { Icon, Input, AutoComplete } from "antd"
import * as React from "react"
const { Option, OptGroup } = AutoComplete

import "#src/antd/styles.less"

const Search = ({ dataSource, onChange }) => {
    return (
        <div className="certain-category-search-wrapper" style={{ width: 500 }}>
            <AutoComplete
                className="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                onChange={onChange}
                size="large"
                style={{ width: "100%" }}
                dataSource={dataSource}
                // placeholder="input here"
                optionLabelProp="value"
            >
                <Input
                    size="large"
                    suffix={
                        <Icon type="search" className="certain-category-icon" />
                    }
                />
            </AutoComplete>
        </div>
    )
}

export default Search
