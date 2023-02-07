#include<iostream>
#include<vector>

using namespace std;

class Solution
{
    public:
    //Function to find a continuous sub-array which adds up to a given number.
    vector<int> subarraySum(vector<int>arr, int n, long long s)
    {   
        // Your code here
        
        vector<int> arrt;
        
        int i = 0;
        int j = 0;
        int sum = 0;
        while(i < n){
            if(sum == s){
                
                arrt.push_back(j+1);
                arrt.push_back(i+1);
                return arrt;
            }
            // cout<<"Summ  = " <<sum<<"i = "<<i<<"j = "<<j<<endl;
            if(sum < s){
                sum = sum + arr[i];
                    i++;
                if(i == n){
                    i--;
                }
            }else{
                sum = sum - arr[j];
                j++;
            }
        }
        arrt.push_back(-1);
        return arrt;
    }
};

int main()
 {
    int t= 1;
    // cin>>t;
    while(t--)
    {
        int n = 5;
        long long s =12;
        // cin>>n>>s;
        vector<int>arr(n);
        // int arr[n];
        const int mx = 1e9;
        for(int i=0;i<n;i++)
        {
            cin>>arr[i];
        }
        Solution ob;
        vector<int>res;
        res = ob.subarraySum(arr, n, s);
        
        for(int i = 0;i<res.size();i++)
            cout<<res[i]<<" ";
        cout<<endl;
        
    }
	return 0;
}