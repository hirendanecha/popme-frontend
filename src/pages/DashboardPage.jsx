import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import ClockSvg from '../assets/svgs/ClockSvg';
import CustomersStoriesSvg from '../assets/svgs/CustomersStoriesSvg';
import FrequentlyAskedSvg from '../assets/svgs/FrequentlyAskedSvg';
import GroupSvg from '../assets/svgs/GroupSvg';
import MouseSvg from '../assets/svgs/MouseSvg';
import PopMeBlogSvg from '../assets/svgs/PopMeBlogSvg';
import PopupUsecaseSvg from '../assets/svgs/PopupUsecaseSvg';
import RightArrowSvg from '../assets/svgs/RightArrowSvg';
import SetupWorkspaceSvg from '../assets/svgs/SetupWorkspaceSvg';
import Button from '../components/Button/Button';
import SelectBox from '../components/Input/SelectBox';
import { setPageTitle } from '../redux/slices/headerSlice';

const DashboardPage = () => {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setPageTitle({ title: "Dashboard" }))
  }, [])

  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )

  const updateValue = (data) => {
    console.log("data", data);
  };


  return (
    <div className="h-full py-8 px-4 lg:px-6">

      <div className="inline-block w-full">
        <div className="flex items-center justify-between mb-9">
          <h2 className='text-2xl font-bold text-primary-main'>Welcome back, Elie</h2>

          <div className='flex flex-wrap items-center justify-end gap-3'>
            <SelectBox options={[{ name: "Last 7 days", value: 1 }, { name: "option 2", value: 2 }]} updateFormValue={updateValue} containerStyle="min-w-[10rem]" selectStyle="text-primary-main" />
            <Button text="New Workspace" leftIcon={PlusIcon()} />
          </div>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className='flex flex-wrap p-5 border border-[#E5E7EB] rounded-xl'>
            <div className='flex items-center justify-center w-12 h-12 bg-secondary-light/30 rounded-full mr-5'>
              <GroupSvg />
            </div>

            <div className='flex flex-col'>
              <h6 className='text-base text-primary-normal font-medium'>Total Views</h6>
              <span className='text-2xl text-primary-main font-bold'>0</span>
            </div>
          </div>

          <div className='flex flex-wrap p-5 border border-[#E5E7EB] rounded-xl'>
            <div className='flex items-center justify-center w-12 h-12 bg-secondary-light/30 rounded-full mr-5'>
              <ClockSvg />
            </div>

            <div className='flex flex-col'>
              <h6 className='text-base text-primary-normal font-medium'>Total Minutes Watchtime</h6>
              <span className='text-2xl text-primary-main font-bold'>0</span>
            </div>
          </div>

          <div className='flex flex-wrap p-5 border border-[#E5E7EB] rounded-xl'>
            <div className='flex items-center justify-center w-12 h-12 bg-secondary-light/30 rounded-full mr-5'>
              <MouseSvg />
            </div>

            <div className='flex flex-col'>
              <h6 className='text-base text-primary-normal font-medium'>Total Views</h6>
              <span className='text-2xl text-primary-main font-bold'>0</span>
            </div>
          </div>
        </div>


        <div class="grid grid-cols-6 gap-4">
          <div class="col-start-1 col-end-7 xl:col-start-1 xl:col-end-5">
            <div className="inline-block w-full p-3 border border-[#E5E7EB] rounded-md h-[208px] mb-3">
              <div className='flex items-center'>
                <div className='flex items-center justify-center w-6 h-6 bg-secondary-light/30 rounded-full mr-1'>
                  <GroupSvg height='14px' width='14px' />
                </div>
                <h6 className="text-primary-main font-bold text-sm">Total Views</h6>
              </div>

              <div className='flex justify-center items-center h-full'>
                <Button text="New Workspace" leftIcon={PlusIcon()} />
              </div>
            </div>

            <div className="inline-block w-full p-3 border border-[#E5E7EB] rounded-md h-[208px]">
              <div className='flex items-center'>
                <div className='flex items-center justify-center w-6 h-6 bg-secondary-light/30 rounded-full mr-1'>
                  <MouseSvg height='13px' width='13px' />
                </div>
                <h6 className="text-primary-main font-bold text-sm">Total Clicked CTA</h6>
              </div>

              <div className='flex justify-center items-center h-full'>
                <Button text="New Workspace" leftIcon={PlusIcon()} />
              </div>
            </div>
          </div>

          <div class="col-start-1 col-end-7 xl:col-start-5 xl:col-end-7">
            <div className="inline-block w-full p-4 border border-[#E5E7EB] rounded-md">

              <h4 className="text-lg text-[#374151] font-bold">PopMe Insights</h4>
              <p className='text-sm text-primary-light font-normal mb-4'>Lorem Ipsum is simply dummy text of the printing.</p>

              <div className='inline-block w-full'>

                <div tabIndex={0} className="collapse bg-transparent rounded-box mb-2">
                  <input type="checkbox" />

                  <div className='flex items-center justify-between collapse-title p-0'>
                    <div className='flex'>
                      <div className='flex items-center justify-center w-11 h-11 rounded-2xl bg-secondary-main mr-3'>
                        <PopupUsecaseSvg />
                      </div>
                      <div className='flex flex-col'>
                        <h4 className="text-primary-main text-base font-semibold">Popup Usecase</h4>
                        <p className="text-primary-normal text-xs">Discover how you should use PopMe</p>
                      </div>
                    </div>

                    <div className='flex'>
                      <RightArrowSvg />
                    </div>
                  </div>

                  <div className="collapse-content">
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                </div>

                <div tabIndex={1} className="collapse bg-transparent rounded-box mb-2">
                  <input type="checkbox" />

                  <div className='flex items-center justify-between collapse-title p-0'>
                    <div className='flex'>
                      <div className='flex items-center justify-center w-11 h-11 rounded-2xl bg-secondary-main mr-3'>
                        <SetupWorkspaceSvg />
                      </div>

                      <div className='flex flex-col'>
                        <h4 className="text-primary-main text-base font-semibold">Set up Workspace</h4>
                        <p className="text-primary-normal text-xs">Know how to set up your workspace</p>
                      </div>
                    </div>

                    <div className='flex'>
                      <RightArrowSvg />
                    </div>
                  </div>

                  <div className="collapse-content">
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                </div>

                <div tabIndex={2} className="collapse bg-transparent rounded-box mb-2">
                  <input type="checkbox" />

                  <div className='flex items-center justify-between collapse-title p-0'>
                    <div className='flex'>
                      <div className='flex items-center justify-center w-11 h-11 rounded-2xl bg-secondary-main mr-3'>
                        <CustomersStoriesSvg />
                      </div>

                      <div className='flex flex-col'>
                        <h4 className="text-primary-main text-base font-semibold">Customers Stories</h4>
                        <p className="text-primary-normal text-xs">See the results we drive</p>
                      </div>
                    </div>

                    <div className='flex'>
                      <RightArrowSvg />
                    </div>
                  </div>

                  <div className="collapse-content">
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                </div>


                <div tabIndex={3} className="collapse bg-transparent rounded-box mb-2">
                  <input type="checkbox" />

                  <div className='flex items-center justify-between collapse-title p-0'>
                    <div className='flex'>
                      <div className='flex items-center justify-center w-11 h-11 rounded-2xl bg-secondary-main mr-3'>
                        <PopMeBlogSvg />
                      </div>

                      <div className='flex flex-col'>
                        <h4 className="text-primary-main text-base font-semibold">PopMe Blog</h4>
                        <p className="text-primary-normal text-xs">Learn all things about PopMe</p>
                      </div>
                    </div>

                    <div className='flex'>
                      <RightArrowSvg />
                    </div>
                  </div>

                  <div className="collapse-content">
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                </div>

                <div tabIndex={4} className="collapse bg-transparent rounded-box mb-2">
                  <input type="checkbox" />

                  <div className='flex items-center justify-between collapse-title p-0'>
                    <div className='flex'>
                      <div className='flex items-center justify-center w-11 h-11 rounded-2xl bg-secondary-main mr-3'>
                        <FrequentlyAskedSvg />
                      </div>

                      <div className='flex flex-col'>
                        <h4 className="text-primary-main text-base font-semibold">Frequently Asked Questions</h4>
                        <p className="text-primary-normal text-xs">Take a look at commonly asked questions</p>
                      </div>
                    </div>

                    <div className='flex'>
                      <RightArrowSvg />
                    </div>
                  </div>

                  <div className="collapse-content">
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardPage