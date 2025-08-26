import type { SchemaExample } from '../types/schema';

export const exampleSchemas: SchemaExample[] = [
  {
    id: 'basic-form',
    title: '基础表单',
    description: '包含常用表单元素的基础示例',
    type: 'form',
    schema: {
      type: 'object',
      title: '用户注册表单',
      properties: {
        name: {
          type: 'string',
          title: '姓名',
          minLength: 2,
          maxLength: 20
        },
        email: {
          type: 'string',
          title: '邮箱',
          format: 'email'
        },
        age: {
          type: 'integer',
          title: '年龄',
          minimum: 18,
          maximum: 100
        },
        gender: {
          type: 'string',
          title: '性别',
          enum: ['male', 'female', 'other'],
          enumNames: ['男', '女', '其他']
        },
        newsletter: {
          type: 'boolean',
          title: '订阅邮件',
          default: false
        }
      },
      required: ['name', 'email', 'age']
    },
    uiSchema: {
      email: {
        'ui:help': '请输入有效的邮箱地址'
      },
      age: {
        'ui:widget': 'updown'
      },
      gender: {
        'ui:widget': 'radio'
      }
    },
    formData: {
      name: '张三',
      email: 'zhangsan@example.com',
      age: 25,
      gender: 'male',
      newsletter: true
    }
  },
  {
    id: 'nested-form',
    title: '嵌套表单',
    description: '包含嵌套对象和数组的复杂表单',
    type: 'form',
    schema: {
      type: 'object',
      title: '员工信息表单',
      properties: {
        personalInfo: {
          type: 'object',
          title: '个人信息',
          properties: {
            firstName: {
              type: 'string',
              title: '姓'
            },
            lastName: {
              type: 'string',
              title: '名'
            },
            birthday: {
              type: 'string',
              title: '生日',
              format: 'date'
            }
          },
          required: ['firstName', 'lastName']
        },
        address: {
          type: 'object',
          title: '地址信息',
          properties: {
            street: {
              type: 'string',
              title: '街道'
            },
            city: {
              type: 'string',
              title: '城市'
            },
            zipCode: {
              type: 'string',
              title: '邮编',
              pattern: '^\\d{6}$'
            }
          }
        },
        skills: {
          type: 'array',
          title: '技能列表',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                title: '技能名称'
              },
              level: {
                type: 'string',
                title: '熟练程度',
                enum: ['beginner', 'intermediate', 'advanced'],
                enumNames: ['初级', '中级', '高级']
              }
            },
            required: ['name', 'level']
          }
        }
      },
      required: ['personalInfo']
    },
    uiSchema: {
      personalInfo: {
        'ui:description': '请填写您的基本个人信息'
      },
      address: {
        'ui:description': '请填写您的居住地址'
      },
      skills: {
        'ui:description': '请添加您的专业技能',
        items: {
          level: {
            'ui:widget': 'select'
          }
        }
      }
    },
    formData: {
      personalInfo: {
        firstName: '张',
        lastName: '三',
        birthday: '1990-01-01'
      },
      address: {
        street: '中关村大街1号',
        city: '北京',
        zipCode: '100000'
      },
      skills: [
        {
          name: 'JavaScript',
          level: 'advanced'
        },
        {
          name: 'React',
          level: 'intermediate'
        }
      ]
    }
  },
  {
    id: 'conditional-form',
    title: '条件表单',
    description: '根据选择显示不同字段的条件表单',
    type: 'form',
    schema: {
      type: 'object',
      title: '产品订购表单',
      properties: {
        productType: {
          type: 'string',
          title: '产品类型',
          enum: ['digital', 'physical'],
          enumNames: ['数字产品', '实体产品']
        },
        quantity: {
          type: 'integer',
          title: '数量',
          minimum: 1,
          default: 1
        }
      },
      dependencies: {
        productType: {
          oneOf: [
            {
              properties: {
                productType: { enum: ['digital'] },
                downloadFormat: {
                  type: 'string',
                  title: '下载格式',
                  enum: ['pdf', 'epub', 'mobi'],
                  enumNames: ['PDF', 'EPUB', 'MOBI']
                },
                licenseType: {
                  type: 'string',
                  title: '许可类型',
                  enum: ['personal', 'commercial'],
                  enumNames: ['个人使用', '商业使用']
                }
              },
              required: ['downloadFormat', 'licenseType']
            },
            {
              properties: {
                productType: { enum: ['physical'] },
                shippingAddress: {
                  type: 'object',
                  title: '收货地址',
                  properties: {
                    street: {
                      type: 'string',
                      title: '街道地址'
                    },
                    city: {
                      type: 'string',
                      title: '城市'
                    },
                    zipCode: {
                      type: 'string',
                      title: '邮编'
                    }
                  },
                  required: ['street', 'city', 'zipCode']
                },
                shippingMethod: {
                  type: 'string',
                  title: '配送方式',
                  enum: ['standard', 'express', 'overnight'],
                  enumNames: ['标准配送', '快速配送', '隔夜送达']
                }
              },
              required: ['shippingAddress', 'shippingMethod']
            }
          ]
        }
      },
      required: ['productType', 'quantity']
    },
    uiSchema: {
      productType: {
        'ui:widget': 'radio'
      },
      quantity: {
        'ui:widget': 'updown'
      }
    },
    formData: {
      productType: 'digital',
      quantity: 1,
      downloadFormat: 'pdf',
      licenseType: 'personal'
    }
  },

  // 新增组件示例
  {
    id: 'dashboard-layout',
    title: '仪表板布局',
    description: '展示网格布局和统计卡片',
    type: 'component',
    schema: {
      "_isJSONSchemaObject": true,
      "version": "2.0",
      "type": "void",
      "x-component": "Grid.Row",
      "x-component-props": {
        "spacing": 3
      },
      "properties": {
        "col1": {
          "type": "void",
          "x-component": "Grid.Col",
          "x-component-props": {
            "xs": 12,
            "md": 3
          },
          "properties": {
            "card1": {
              "type": "void",
              "x-component": "StatsCard",
              "x-component-props": {
                "title": "总用户数",
                "value": "1,234",
                "subtitle": "较上月增长 12%",
                "color": "primary"
              }
            }
          }
        },
        "col2": {
          "type": "void",
          "x-component": "Grid.Col",
          "x-component-props": {
            "xs": 12,
            "md": 3
          },
          "properties": {
            "card2": {
              "type": "void",
              "x-component": "StatsCard",
              "x-component-props": {
                "title": "订单数量",
                "value": "567",
                "subtitle": "较上月增长 8%",
                "color": "success"
              }
            }
          }
        },
        "col3": {
          "type": "void",
          "x-component": "Grid.Col",
          "x-component-props": {
            "xs": 12,
            "md": 3
          },
          "properties": {
            "card3": {
              "type": "void",
              "x-component": "StatsCard",
              "x-component-props": {
                "title": "收入",
                "value": "¥89,012",
                "subtitle": "较上月增长 15%",
                "color": "warning"
              }
            }
          }
        },
        "col4": {
          "type": "void",
          "x-component": "Grid.Col",
          "x-component-props": {
            "xs": 12,
            "md": 3
          },
          "properties": {
            "card4": {
              "type": "void",
              "x-component": "StatsCard",
              "x-component-props": {
                "title": "转化率",
                "value": "23.5%",
                "subtitle": "较上月增长 3%",
                "color": "error"
              }
            }
          }
        }
      }
    }
  },

  {
    id: 'data-table',
    title: '数据表格',
    description: '展示表格组件和操作栏',
    type: 'component',
    schema: {
      "_isJSONSchemaObject": true,
      "version": "2.0",
      "type": "void",
      "x-component": "CardItem",
      "properties": {
        "actions": {
          "type": "void",
          "x-component": "ActionBar",
          "x-component-props": {
            "style": {
              "marginBottom": "16px"
            }
          },
          "properties": {
            "addBtn": {
              "type": "void",
              "x-component": "Button",
              "x-component-props": {
                "variant": "contained",
                "children": "添加用户"
              }
            },
            "exportBtn": {
              "type": "void",
              "x-component": "Button",
              "x-component-props": {
                "variant": "outlined",
                "children": "导出数据",
                "sx": { "ml": 1 }
              }
            }
          }
        },
        "table": {
          "type": "void",
          "x-component": "DataTable",
          "x-component-props": {
            "columns": [
              { "title": "姓名", "dataIndex": "name" },
              { "title": "邮箱", "dataIndex": "email" },
              { "title": "角色", "dataIndex": "role" },
              { "title": "状态", "dataIndex": "status" }
            ],
            "data": [
              { "name": "张三", "email": "zhangsan@example.com", "role": "管理员", "status": "活跃" },
              { "name": "李四", "email": "lisi@example.com", "role": "用户", "status": "活跃" },
              { "name": "王五", "email": "wangwu@example.com", "role": "用户", "status": "禁用" }
            ]
          }
        }
      }
    }
  },

  {
    id: 'content-layout',
    title: '内容布局',
    description: '展示各种内容组件的组合',
    type: 'component',
    schema: {
      "_isJSONSchemaObject": true,
      "version": "2.0",
      "type": "void",
      "x-component": "Box",
      "properties": {
        "alert": {
          "type": "void",
          "x-component": "Alert",
          "x-component-props": {
            "severity": "info",
            "children": "这是一个信息提示",
            "sx": { "mb": 2 }
          }
        },
        "progress": {
          "type": "void",
          "x-component": "LinearProgress",
          "x-component-props": {
            "value": 75,
            "variant": "determinate",
            "sx": { "mb": 2 }
          }
        },
        "grid": {
          "type": "void",
          "x-component": "Grid.Row",
          "x-component-props": {
            "spacing": 2
          },
          "properties": {
            "leftCol": {
              "type": "void",
              "x-component": "Grid.Col",
              "x-component-props": {
                "xs": 12,
                "md": 8
              },
              "properties": {
                "mainCard": {
                  "type": "void",
                  "x-component": "Card",
                  "properties": {
                    "cardContent": {
                      "type": "void",
                      "x-component": "CardContent",
                      "properties": {
                        "title": {
                          "type": "void",
                          "x-component": "Typography",
                          "x-component-props": {
                            "variant": "h5",
                            "children": "主要内容区域"
                          }
                        },
                        "content": {
                          "type": "void",
                          "x-component": "Typography",
                          "x-component-props": {
                            "variant": "body1",
                            "children": "这里是主要的内容区域，可以放置各种信息和数据。",
                            "sx": { "mt": 2 }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "rightCol": {
              "type": "void",
              "x-component": "Grid.Col",
              "x-component-props": {
                "xs": 12,
                "md": 4
              },
              "properties": {
                "sidebarCard": {
                  "type": "void",
                  "x-component": "Card",
                  "properties": {
                    "cardContent": {
                      "type": "void",
                      "x-component": "CardContent",
                      "properties": {
                        "sidebarTitle": {
                          "type": "void",
                          "x-component": "Typography",
                          "x-component-props": {
                            "variant": "h6",
                            "children": "侧边栏"
                          }
                        },
                        "tagContainer": {
                          "type": "void",
                          "x-component": "Box",
                          "x-component-props": {
                            "sx": { "mt": 1, "display": "flex", "gap": 1, "flexWrap": "wrap" }
                          },
                          "properties": {
                            "tag1": {
                              "type": "void",
                              "x-component": "Chip",
                              "x-component-props": {
                                "label": "标签1",
                                "color": "primary",
                                "size": "small"
                              }
                            },
                            "tag2": {
                              "type": "void",
                              "x-component": "Chip",
                              "x-component-props": {
                                "label": "标签2",
                                "color": "secondary",
                                "size": "small"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
];