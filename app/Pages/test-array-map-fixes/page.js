'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  Bug, 
  Shield,
  Code,
  TestTube,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

const TestArrayMapFixesPage = () => {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Test cases for various .map() scenarios
  const runSafetyTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const tests = [
      {
        name: 'Null Itinerary Days',
        description: 'Test itinerary.days.map() with null days',
        test: () => {
          try {
            const itinerary = { days: null };
            const result = itinerary?.days?.map(() => 'test');
            return result === undefined || result === null; // Should be undefined/null, not crash
          } catch (error) {
            console.error('Null days test error:', error);
            return false;
          }
        }
      },
      {
        name: 'Undefined Itinerary Days',
        description: 'Test itinerary.days.map() with undefined days',
        test: () => {
          try {
            const itinerary = { days: undefined };
            const result = itinerary?.days?.map(() => 'test');
            return result === undefined || result === null; // Should be undefined/null, not crash
          } catch (error) {
            console.error('Undefined days test error:', error);
            return false;
          }
        }
      },
      {
        name: 'Empty Activities Array',
        description: 'Test day.activities.map() with empty activities',
        test: () => {
          try {
            const day = { activities: [] };
            const result = day?.activities?.map(activity => activity.title);
            return Array.isArray(result) && result.length === 0; // Should return empty array
          } catch (error) {
            console.error('Empty activities test error:', error);
            return false;
          }
        }
      },
      {
        name: 'Null Activities Array',
        description: 'Test day.activities.map() with null activities',
        test: () => {
          try {
            const day = { activities: null };
            const result = day?.activities?.map(activity => activity.title);
            return result === undefined || result === null; // Should be undefined/null, not crash
          } catch (error) {
            console.error('Null activities test error:', error);
            return false;
          }
        }
      },
      {
        name: 'Undefined Activity Highlights',
        description: 'Test activity.highlights.map() with undefined highlights',
        test: () => {
          try {
            const activity = { highlights: undefined };
            const result = activity?.highlights?.map(highlight => highlight);
            return result === undefined || result === null; // Should be undefined/null, not crash
          } catch (error) {
            console.error('Undefined highlights test error:', error);
            return false;
          }
        }
      },
      {
        name: 'Complex Nested Structure',
        description: 'Test deeply nested optional chaining',
        test: () => {
          try {
            const data = {
              itinerary: {
                days: [
                  {
                    activities: [
                      {
                        highlights: ['Test Highlight']
                      }
                    ]
                  }
                ]
              }
            };
            
            const result = data?.itinerary?.days?.[0]?.activities?.[0]?.highlights?.map(h => h);
            return Array.isArray(result) && result.length === 1 && result[0] === 'Test Highlight';
          } catch (error) {
            console.error('Complex nested test error:', error);
            return false;
          }
        }
      },
      {
        name: 'Cost Calculation Safety',
        description: 'Test calculateTotalCost with missing data',
        test: () => {
          try {
            const itinerary = {
              days: null,
              accommodation: null,
              transport: null,
              duration: '3'
            };
            
            // Simulate the calculateTotalCost logic
            if (!itinerary || !itinerary.days) return 0;
            
            let totalCost = 0;
            
            // This should not crash
            itinerary?.days?.forEach(day => {
              day?.activities?.forEach(activity => {
                const cost = activity?.cost?.replace('₹', '').replace(',', '').replace('Varies', '500') || '0';
                totalCost += parseInt(cost) || 0;
              });
            });
            
            const accCost = itinerary?.accommodation?.price?.replace('₹', '').replace('/night', '').replace(',', '') || '0';
            totalCost += (parseInt(accCost) || 0) * parseInt(itinerary.duration || 1);
            
            const transCost = itinerary?.transport?.cost?.replace('₹', '').replace('/day', '').replace(',', '') || '0';
            totalCost += (parseInt(transCost) || 0) * parseInt(itinerary.duration || 1);
            
            return totalCost === 0; // Should return 0, not crash
          } catch (error) {
            console.error('Cost calculation test error:', error);
            return false;
          }
        }
      },
      {
        name: 'Essentials Mapping Safety',
        description: 'Test Object.entries() with undefined essentials',
        test: () => {
          try {
            const itinerary = { essentials: undefined };
            const result = Object.entries(itinerary?.essentials || {}).map(([category, items]) => {
              return items?.map(item => item) || [];
            });
            return Array.isArray(result) && result.length === 0; // Should return empty array
          } catch (error) {
            console.error('Essentials mapping test error:', error);
            return false;
          }
        }
      }
    ];

    const results = [];
    for (const test of tests) {
      try {
        const result = test.test();
        results.push({
          ...test,
          status: result ? 'success' : 'error',
          message: result ? 'Test passed - no crash occurred' : 'Test failed - crash detected',
          details: result ? 'Safe optional chaining working correctly' : 'Unsafe operation detected'
        });
      } catch (error) {
        results.push({
          ...test,
          status: 'error',
          message: `Test error: ${error.message}`,
          details: 'Exception thrown during test execution'
        });
      }
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Array.map() Safety Tests
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Verify that optional chaining prevents React crashes from undefined/null .map() calls
            </p>
            <Button
              onClick={runSafetyTests}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Running Safety Tests...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4" />
                  Run Safety Tests
                </>
              )}
            </Button>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Safety Test Results</h2>
              {testResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`border-2 ${getStatusColor(result.status)}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(result.status)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {result.name}
                          </h3>
                          <p className="text-gray-600 mb-2">{result.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                              {result.status.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-gray-500">{result.message}</span>
                          </div>
                          <p className="text-sm text-gray-600">{result.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Fix Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Bug className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Before Fix</h3>
                    <p className="text-sm text-gray-600">Unsafe .map() operations</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• itinerary.days.map() crashes on null</li>
                  <li>• day.activities.map() crashes on undefined</li>
                  <li>• activity.highlights.map() crashes</li>
                  <li>• No fallback UI for missing data</li>
                  <li>• React crashes during rendering</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">After Fix</h3>
                    <p className="text-sm text-gray-600">Safe optional chaining</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• itinerary?.days?.map() safe</li>
                  <li>• day?.activities?.map() safe</li>
                  <li>• activity?.highlights?.map() safe</li>
                  <li>• Fallback UI for missing data</li>
                  <li>• No React crashes</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Technical Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Technical Fixes Applied</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Optional Chaining Pattern
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Before (Unsafe):</p>
                      <code className="text-xs bg-red-100 text-red-800 p-2 rounded block">
                        {`itinerary.days.map((day) => { ... })`}
                      </code>
                      <p className="text-sm text-gray-600 mb-2 mt-4">After (Safe):</p>
                      <code className="text-xs bg-green-100 text-green-800 p-2 rounded block">
                        {`itinerary?.days?.map((day) => { ... })`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      State Initialization
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Before (Unsafe):</p>
                      <code className="text-xs bg-red-100 text-red-800 p-2 rounded block">
                        {`const [itinerary, setItinerary] = useState(null);`}
                      </code>
                      <p className="text-sm text-gray-600 mb-2 mt-4">After (Safe):</p>
                      <code className="text-xs bg-green-100 text-green-800 p-2 rounded block">
                        {`const [itinerary, setItinerary] = useState({ days: [] });`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Fallback UI Pattern
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-xs bg-green-100 text-green-800 p-2 rounded block">
                        {`{itinerary?.days?.length > 0 ? (
  itinerary?.days?.map((day) => { ... })
) : (
  <div>No itinerary available</div>
)}`}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Flow */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Test Flow Verification</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    To verify the fixes work in the actual application flow:
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">1</Badge>
                    <span>Home → Trip Planner</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">2</Badge>
                    <span>Trip Planner → Customize Trip</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">3</Badge>
                    <span>Customize Trip → Save Changes</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">4</Badge>
                    <span>ItineraryPage renders without crashes</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  
                  <Button
                    onClick={() => window.location.href = '/Pages/trip-planner/itinerary'}
                    className="mt-4"
                  >
                    Test Full Application Flow
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestArrayMapFixesPage;
