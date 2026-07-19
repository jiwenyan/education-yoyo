import { describe, it, expect } from 'vitest';
import {
  GRADE_TABLES,
  getGradeInfo,
  generateMultiplicationByGrade,
} from './multiplicationTables';

describe('multiplicationTables', () => {
  describe('GRADE_TABLES', () => {
    it('has entries for grades 2 through 5', () => {
      expect(GRADE_TABLES[2]).toBeDefined();
      expect(GRADE_TABLES[3]).toBeDefined();
      expect(GRADE_TABLES[4]).toBeDefined();
      expect(GRADE_TABLES[5]).toBeDefined();
    });

    it('grade 2 has correct tables and maxFactor', () => {
      expect(GRADE_TABLES[2].tables).toEqual([2, 5, 10]);
      expect(GRADE_TABLES[2].maxFactor).toBe(12);
    });

    it('grade 3 has review tables defined', () => {
      expect(GRADE_TABLES[3].reviewTables).toBeDefined();
      expect(GRADE_TABLES[3].reviewTables).toContain(2);
    });

    it('grade 4 has review tables defined', () => {
      expect(GRADE_TABLES[4].reviewTables).toBeDefined();
      expect(GRADE_TABLES[4].tables).toEqual([6, 7, 9, 12]);
    });

    it('grade 5 has multiDigit flag', () => {
      expect(GRADE_TABLES[5].multiDigit).toBe(true);
    });
  });

  describe('getGradeInfo', () => {
    it('returns grade info for valid grades', () => {
      expect(getGradeInfo(2).label).toBe('Grade 2');
      expect(getGradeInfo(5).multiDigit).toBe(true);
    });

    it('returns null for invalid grades', () => {
      expect(getGradeInfo(1)).toBeNull();
      expect(getGradeInfo(6)).toBeNull();
      expect(getGradeInfo('abc')).toBeNull();
    });
  });

  describe('generateMultiplicationByGrade', () => {
    it('returns empty array for invalid grade', () => {
      expect(generateMultiplicationByGrade(99, 10)).toEqual([]);
      expect(generateMultiplicationByGrade(null, 5)).toEqual([]);
    });

    it('generates the requested number of problems', () => {
      const problems = generateMultiplicationByGrade(2, 10);
      expect(problems).toHaveLength(10);
    });

    it('all problems use the multiplication operator', () => {
      const problems = generateMultiplicationByGrade(2, 15);
      problems.forEach((p) => {
        expect(p.operator).toBe('×');
      });
    });

    it('all problems have correctAnswer equal to a * b', () => {
      const problems = generateMultiplicationByGrade(3, 10);
      problems.forEach((p) => {
        expect(p.correctAnswer).toBe(p.a * p.b);
      });
    });

    it('generates unique problems (no duplicates)', () => {
      const problems = generateMultiplicationByGrade(2, 10);
      const keys = problems.map((p) => `${p.a}×${p.b}`);
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(keys.length);
    });

    it('handles small counts', () => {
      const problems = generateMultiplicationByGrade(2, 1);
      expect(problems).toHaveLength(1);
      expect(problems[0].operator).toBe('×');
    });

    describe('grade 2 problems', () => {
      it('uses factors from tables 2, 5, 10', () => {
        const problems = generateMultiplicationByGrade(2, 20);
        const factors = new Set();
        problems.forEach((p) => {
          factors.add(p.a);
          factors.add(p.b);
        });
        // All factors in the problem set should be within the grade 2 table scope
        const allowedTables = [2, 5, 10];
        // Every problem should have at least one factor from the tables
        problems.forEach((p) => {
          const hasTableFactor =
            allowedTables.includes(p.a) || allowedTables.includes(p.b);
          expect(hasTableFactor).toBe(true);
        });
      });

      it('keeps factors within 1-12 range', () => {
        const problems = generateMultiplicationByGrade(2, 20);
        problems.forEach((p) => {
          expect(p.a).toBeGreaterThanOrEqual(1);
          expect(p.a).toBeLessThanOrEqual(12);
          expect(p.b).toBeGreaterThanOrEqual(1);
          expect(p.b).toBeLessThanOrEqual(12);
        });
      });
    });

    describe('grade 5+ multi-digit problems', () => {
      it('generates multi-digit multiplication problems', () => {
        const problems = generateMultiplicationByGrade(5, 10);
        expect(problems).toHaveLength(10);
        problems.forEach((p) => {
          expect(p.operator).toBe('×');
          expect(p.correctAnswer).toBe(p.a * p.b);
        });
      });

      it('includes problems with both factors >= 10', () => {
        const problems = generateMultiplicationByGrade(5, 20);
        const largeBoth = problems.some((p) => p.a >= 10 && p.b >= 10);
        expect(largeBoth).toBe(true);
      });

      it('includes problems with single-digit multiplier', () => {
        const problems = generateMultiplicationByGrade(5, 20);
        const singleDigit = problems.some((p) => (p.a < 10) !== (p.b < 10));
        expect(singleDigit).toBe(true);
      });
    });
  });
});
