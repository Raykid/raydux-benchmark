/**
 * 生成一个10MB内存的大型复杂JSON对象
 * 包含嵌套结构、数组、字符串、数字、布尔值等多种数据类型
 */
export function generateLargeJson(): object {
  const size = 10 * 1024 * 1024; // 10MB
  let currentSize = 0;
  const result: any = {
    metadata: {
      generatedAt: new Date().toISOString(),
      size: `${size} bytes`,
      version: "1.0.0",
    },
    data: [],
  };

  // 生成大量嵌套对象
  const generateNestedObject = (depth: number = 0): any => {
    if (depth > 5 || Math.random() < 0.1) {
      return Math.random() < 0.5
        ? `string_${Math.random().toString(36).substring(2, 15)}`
        : Math.floor(Math.random() * 10000);
    }

    const obj: any = {};
    const keys = [
      "id",
      "name",
      "value",
      "data",
      "config",
      "settings",
      "properties",
      "items",
    ];

    for (let i = 0; i < 5 + Math.floor(Math.random() * 10); i++) {
      const key = keys[Math.floor(Math.random() * keys.length)] + "_" + i;
      if (Math.random() < 0.3) {
        obj[key] = generateNestedObject(depth + 1);
      } else if (Math.random() < 0.5) {
        obj[key] = Array.from(
          { length: 5 + Math.floor(Math.random() * 20) },
          () =>
            Math.random() < 0.5
              ? Math.floor(Math.random() * 1000)
              : `text_${Math.random().toString(36).substring(2, 8)}`,
        );
      } else {
        obj[key] =
          Math.random() < 0.5
            ? Math.floor(Math.random() * 1000000)
            : Math.random() < 0.5;
      }
    }
    return obj;
  };

  // 生成大型数组
  while (currentSize < size * 0.8) {
    const item = {
      id: Math.floor(Math.random() * 1000000),
      timestamp: Date.now() + Math.floor(Math.random() * 86400000),
      user: {
        id: `user_${Math.floor(Math.random() * 10000)}`,
        name: `User_${Math.random().toString(36).substring(2, 8)}`,
        email: `user${Math.floor(Math.random() * 10000)}@example.com`,
        profile: {
          age: 18 + Math.floor(Math.random() * 50),
          location: {
            city: `City_${Math.random().toString(36).substring(2, 6)}`,
            country: `Country_${Math.random().toString(36).substring(2, 6)}`,
            coordinates: {
              lat: (Math.random() * 180 - 90).toFixed(6),
              lng: (Math.random() * 360 - 180).toFixed(6),
            },
          },
          preferences: Array.from({ length: 10 }, () => ({
            key: `pref_${Math.random().toString(36).substring(2, 6)}`,
            value: Math.random() < 0.5,
            weight: Math.random(),
          })),
        },
      },
      content: {
        title: `Title_${Math.random().toString(36).substring(2, 15)}`,
        body: Array.from(
          { length: 5 + Math.floor(Math.random() * 10) },
          () =>
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${Math.random().toString(36).substring(2, 50)}`,
        ).join(" "),
        tags: Array.from(
          { length: 5 + Math.floor(Math.random() * 15) },
          () => `tag_${Math.random().toString(36).substring(2, 6)}`,
        ),
        metadata: generateNestedObject(),
      },
      stats: {
        views: Math.floor(Math.random() * 100000),
        likes: Math.floor(Math.random() * 50000),
        shares: Math.floor(Math.random() * 10000),
        comments: Array.from(
          { length: 5 + Math.floor(Math.random() * 20) },
          () => ({
            id: Math.floor(Math.random() * 1000000),
            userId: `user_${Math.floor(Math.random() * 10000)}`,
            text: `Comment_${Math.random().toString(36).substring(2, 30)}`,
            timestamp: Date.now() - Math.floor(Math.random() * 86400000),
            reactions: Array.from(
              { length: 3 + Math.floor(Math.random() * 5) },
              () => ({
                type: ["like", "love", "haha", "wow", "sad", "angry"][
                  Math.floor(Math.random() * 6)
                ],
                count: Math.floor(Math.random() * 1000),
              }),
            ),
          }),
        ),
      },
    };

    result.data.push(item);

    // 估算当前大小（粗略计算）
    currentSize += JSON.stringify(item).length;
  }

  // 添加更多复杂结构
  result.config = {
    database: {
      host: `db-${Math.random().toString(36).substring(2, 8)}.example.com`,
      port: 3000 + Math.floor(Math.random() * 5000),
      credentials: {
        username: `admin_${Math.random().toString(36).substring(2, 6)}`,
        password: `pass_${Math.random().toString(36).substring(2, 15)}_${Math.floor(Math.random() * 1000)}`,
      },
      tables: Array.from({ length: 50 }, (_, i) => ({
        name: `table_${i}`,
        columns: Array.from(
          { length: 10 + Math.floor(Math.random() * 20) },
          () => ({
            name: `col_${Math.random().toString(36).substring(2, 6)}`,
            type: ["string", "number", "boolean", "object", "array"][
              Math.floor(Math.random() * 5)
            ],
            nullable: Math.random() < 0.3,
            index: Math.random() < 0.5,
          }),
        ),
        rows: Math.floor(Math.random() * 100000),
      })),
    },
    cache: {
      redis: {
        host: `redis-${Math.random().toString(36).substring(2, 8)}.example.com`,
        port: 6379,
        keys: Array.from({ length: 1000 }, () => ({
          key: `cache:${Math.random().toString(36).substring(2, 15)}`,
          value:
            Math.random() < 0.5
              ? Math.floor(Math.random() * 1000000).toString()
              : JSON.stringify(generateNestedObject()),
          ttl: Math.floor(Math.random() * 3600),
        })),
      },
    },
    api: {
      endpoints: Array.from({ length: 100 }, () => ({
        path: `/api/${Math.random().toString(36).substring(2, 8)}/${Math.random().toString(36).substring(2, 8)}`,
        method: ["GET", "POST", "PUT", "DELETE", "PATCH"][
          Math.floor(Math.random() * 5)
        ],
        parameters: Array.from(
          { length: 5 + Math.floor(Math.random() * 10) },
          () => ({
            name: `param_${Math.random().toString(36).substring(2, 6)}`,
            type: ["string", "number", "boolean", "object"][
              Math.floor(Math.random() * 4)
            ],
            required: Math.random() < 0.7,
          }),
        ),
        response: generateNestedObject(),
      })),
    },
  };

  // 验证大小
  const jsonString = JSON.stringify(result);
  console.log(
    `Generated JSON size: ${(jsonString.length / 1024 / 1024).toFixed(2)} MB`,
  );

  return result;
}

const largeData = generateLargeJson();

export function copyLargeJson() {
  const newLargeJson = JSON.parse(JSON.stringify(largeData));
  return newLargeJson;
}
