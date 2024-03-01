import { TToggleState2 } from ".";

const test: TToggleState2 = () => void 0 as any;

const result1 = test(['a', 'b', 'c'], { objectValues: true })
type TResult_1_0 = typeof result1[0];
//   ^?
type TResult_1_1 = typeof result1[1];
//   ^?

const result2 = test()
type TResult_2_0 = typeof result2[0];
//   ^?
type TResult_2_1 = typeof result2[1];
//   ^?

const result3 = test(['a', 'b', 'c'])
type TResult_3_0 = typeof result3[0];
//   ^?
type TResult_3_1 = typeof result3[1];
//   ^?

const result4 = test(['a', 'b', 'c'], { objectValues: false })
type TResult_4_0 = typeof result4[0];
//   ^?
type TResult_4_1 = typeof result4[1];
//   ^?
