const {schema_ops, create, duplicate, mutate} = require('../dna');

const schema = {
  activity: `number|min:0|max:1|mutable:10`,
  health: `number|min:80|max:100|mutable:60`,
  fertility: 'boolean|mutable:10',
  attractiveness: 'number|min:50|max:100|mutable:20',
  something: 'mytype',
};


test('dna schema ops type', () => {
  expect(schema_ops.type(schema.attractiveness)).toBe('number');
  expect(schema_ops.type(schema.fertility)).toBe('boolean');
  expect(schema_ops.type(schema.attractiveness)).toBe('number');
  expect(schema_ops.type(schema.something)).toBe('mytype');
});

test('dna schema ops min max', () => {
  expect(schema_ops.min(schema.attractiveness)).toBe('50');
  expect(schema_ops.max(schema.attractiveness)).toBe('100');

  expect(schema_ops.min(schema.activity)).toBe('0');
  expect(schema_ops.max(schema.activity)).toBe('1');

  expect(schema_ops.min(schema.health)).toBe('80');
  expect(schema_ops.max(schema.health)).toBe('100');

  expect(schema_ops.min(schema.fertility)).toBe(null);
  expect(schema_ops.max(schema.fertility)).toBe(null);
});

test('dna create', () => {
  for (let i = 0; i < 100; i++) {
    const dna = create();
    expect(dna.activity).toBeGreaterThanOrEqual(+schema_ops.min(schema.activity));
    expect(dna.activity).toBeLessThanOrEqual(+schema_ops.max(schema.activity));
    expect(dna.attractiveness).toBeGreaterThanOrEqual(+schema_ops.min(schema.attractiveness));
    expect(dna.attractiveness).toBeLessThanOrEqual(+schema_ops.max(schema.attractiveness));
    expect(dna.health).toBeGreaterThanOrEqual(+schema_ops.min(schema.health));
    expect(dna.health).toBeLessThanOrEqual(+schema_ops.max(schema.health));
    expect(typeof dna.fertility).toBe('boolean');
  }
});

test('dna duplicate', () => {
  const dna = create();

  for (let i = 0; i < 100; i++) {
    const dna2 = duplicate(dna);
    expect(dna).toEqual(dna2);
    expect(dna === dna2).toEqual(false);
  }
});

test('dna mutate', () => {
  const dna = create();
  for (let i = 0; i < 100; i++) {
    const dna2 = mutate(dna);
    let mutated_param = null;

    Object.keys(dna2).forEach(key => {
      if (dna[key] !== dna2[key]) {
        expect(mutated_param === null).toBeTruthy(); // just one param mutates
        mutated_param = key;
      }
    });

    if (mutated_param) {
      const val = dna2[mutated_param];

      if (schema_ops.type(schema[mutated_param]) === 'number') {
        const min = +schema_ops.min(schema[mutated_param]);
        const max = +schema_ops.max(schema[mutated_param]);
        expect(val).toBeGreaterThanOrEqual(min);
        expect(val).toBeLessThanOrEqual(max);
      } else if (schema_ops.type(schema[mutated_param]) === 'boolean') {
        expect(typeof val).toBe('boolean');
      }
    }
  }
});
