import React, { Component } from "react";
import { Table, Input, Button, Popover, Typography, Badge } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import "./styles.css";

const { Paragraph } = Typography;

class Dashboard extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [
      {
        key: "1",
        code: "H123",
        status: "A",
        description:
          "This is a detailed comment that goes beyond 50 characters for testing purposes.",
      },
      {
        key: "2",
        code: "H124",
        status: "I",
        description: "Short comment.",
      },
    ],
  };

  getColumnSearchProps = (dataIndex, columnName) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${columnName}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          className="dashboard-btn dashboard-btn-primary"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={clearFilters}
          size="small"
          className="dashboard-btn"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleAddCategory = () => {
    console.log("Add Category button clicked");
    // Add logic to handle adding a category
  };

  render() {
    const columns = [
      {
        title: "Category code",
        dataIndex: "code",
        key: "code",
        ...this.getColumnSearchProps("code", "Code"),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (text) =>
          text.length > 50 ? (
            <Popover
              content={<Paragraph>{text}</Paragraph>}
              title="Description"
              trigger="hover"
              overlayClassName="dashboard-popover-inner"
            >
              {text.substring(0, 50)}...
            </Popover>
          ) : (
            text
          ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          { text: "Active", value: "A" },
          { text: "Inactive", value: "I" },
        ],
        onFilter: (value, record) => record.status === value,
        render: (status) => (
          <Badge
            status={status === "A" ? "success" : "error"}
            text={status === "A" ? "Active" : "Inactive"}
          />
        ),
      },
    ];

    return (
      <div>
        {/* Add Category Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={this.handleAddCategory}
          >
            Add Category
          </Button>
        </div>

        {/* Table */}
        <Table
          className="dashboard-table"
          columns={columns}
          dataSource={this.state.data}
          bordered
          pagination={{
            pageSize: 5,
            className: "dashboard-pagination",
          }}
          scroll={{ x: 800 }}
        />
      </div>
    );
  }
}

export default Dashboard;
