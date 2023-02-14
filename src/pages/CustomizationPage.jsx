import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Button from '../components/Button/Button';
import NewInputText from '../components/Input/NewInputText';
import SelectBox from '../components/Input/SelectBox';
import NewTextArea from '../components/Input/NewTextArea';
import { setPageTitle } from '../redux/slices/headerSlice';
import { useForm } from "react-hook-form";
import UploadFile from '../components/Input/UploadFile';
import CalendarSvg from '../assets/svgs/CalendarSvg';
import InputWithIcon from '../components/Input/InputWithIcon';
import ColorPickerInput from '../components/Input/ColorPickerInput';


const CloseSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-main">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
)

const RightArrowSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-main">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
)


const RightExitSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-main">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
)

const PhoneSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-main">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
)

const IconList = [
    {
        icon: <CloseSvg />
    },
    {
        icon: <RightArrowSvg />
    },
    {
        icon: <RightExitSvg />
    },
    {
        icon: <CalendarSvg />
    },
    {
        icon: <PhoneSvg />
    }
]


const CustomizationPage = () => {

    const dispatch = useDispatch();

    const [pickColor, setPickColor] = useState("#1569a8");


    const colorHandler = (e) => {
        setPickColor(e.target.value)
    }


    const [files, setFile] = useState([]);
    const [message, setMessage] = useState();

    const handleFile = (e) => {

        setMessage("");
        let file = e.target.files;

        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setFile([file[i]]);
            } else {
                setMessage("only images accepted");
            }

        }
    };

    const removeImage = (i) => {
        setFile(files.filter(x => x.name !== i));
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    useEffect(() => {
        dispatch(setPageTitle({ title: "Customization" }))
    }, [])

    const updateValue = (data) => {
        console.log("data", data);
    };


    return (
        <div className="inline-block w-full">
            <div class="grid grid-cols-8 gap-4">
                <div className='col-start-1 col-end-3 py-3 border-r'>
                    <div className='flex flex-col mb-12 px-4 lg:px-6'>
                        <h3 className='text-primary-normal font-bold mb-3 text-xl'>Workspace</h3>

                        <SelectBox options={[{ name: "Workspace #1", value: "Workspace1" }, { name: "Workspace #2", value: "Workspace2" }]} updateFormValue={updateValue} containerStyle="min-w-[10rem] mb-4" selectStyle="text-primary-main" />

                        <div className="inline-block w-full mb-2">
                            <Button text="Delete Selected" buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main" />
                        </div>

                        <div className='flex'>
                            <Button text="New Workspace" buttonClass="w-full text-base" />
                        </div>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col'>
                            <div tabIndex={0} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Basic Setup
                                </div>
                                <div className="collapse-content">
                                    <div className='flex flex-col'>
                                        <div className='flex'>
                                            <NewInputText type="url" labelTitle="Website URL" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name="websiteUrl" register={register} />
                                        </div>

                                        <div className='flex flex-col'>

                                            <h5 className='text-primary-main text-base font-semibold py-2'>Video Position</h5>

                                            <div class="grid grid-cols-2 gap-2">
                                                <div className='inline-block w-full'>
                                                    <Button text="Top Left" buttonClass="w-full text-sm !bg-[#F3F3F4] !hover:bg-[#F3F3F4] !text-black" />
                                                </div>
                                                <div className='inline-block w-full'>
                                                    <Button text="Top Right" buttonClass="w-full text-sm !bg-[#F3F3F4] !hover:bg-[#F3F3F4] !text-black" />
                                                </div>
                                                <div className='inline-block w-full'>
                                                    <Button text="Bottom Left" buttonClass="w-full text-sm !bg-[#F3F3F4] !hover:bg-[#F3F3F4] !text-black" />
                                                </div>
                                                <div className='inline-block w-full'>
                                                    <Button text="Bottom Right" buttonClass="w-full text-sm !bg-[#F3F3F4] !hover:bg-[#F3F3F4] !text-black" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div tabIndex={1} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Add Video
                                </div>
                                <div className="collapse-content">
                                    <div className='flex flex-col'>

                                        <div className='flex'>
                                            <UploadFile updateType='addVideo' register={register} handleFile={(e) => handleFile(e)} removeImage={(e) => removeImage(e)} files={files} />
                                        </div>

                                        <div className='flex'>
                                            <NewInputText type="text" labelTitle="Video Title" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='videoTitle' register={register} />
                                        </div>

                                        <div className='flex'>
                                            <NewTextArea labelTitle="Video Description" labelStyle="text-primary-main text-base font-semibold" inputStyle="!bg-transparent" updateType='videoDescription' register={register} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div tabIndex={2} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Call To Action
                                </div>
                                <div className="collapse-content">
                                    <div className='flex flex-col'>
                                        <NewInputText type="text" labelTitle="Button Text" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='buttonText' register={register} />

                                        <NewInputText type="url" labelTitle="Destination URL" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='destinationUrl' register={register} />

                                        <div className='flex flex-col mb-3'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Button Icon</h5>

                                            <div className='flex flex-wrap gap-3'>
                                                {IconList.map((item, index) => (
                                                    <div className='flex items-center justify-center h-6 w-6 border border-borderColor-main' key={index}>
                                                        {item.icon}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <SelectBox labelTitle="Button Style" labelStyle="text-primary-main text-base font-semibold" options={[{ name: "Filled", value: "filled" }, { name: "Dashed", value: "dashed" }]} containerStyle="min-w-[10rem] mb-3" selectStyle="text-primary-main" name="buttonStyle" register={register} />

                                        <SelectBox labelTitle="Button Corners" labelStyle="text-primary-main text-base font-semibold" options={[{ name: "Round", value: "round" }, { name: "Square", value: "square" }]} containerStyle="min-w-[10rem] mb-3" selectStyle="text-primary-main" name="buttonCorners" register={register} />
                                    </div>
                                </div>
                            </div>

                            <div tabIndex={3} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Design Customization
                                </div>
                                <div className="collapse-content p-0">
                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <InputWithIcon type="text" labelTitle="Author Picture" labelStyle="text-primary-main text-base font-semibold" inputStyle="!bg-transparent" name='authorPicture' register={register} icon />

                                        <NewInputText type="text" labelTitle="Vertical Margin" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='verticalMargin' register={register} />

                                        <NewInputText type="text" labelTitle="Horizontal Margin" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='horizontalMargin' register={register} />
                                    </div>


                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Toggle
                                        </h4>

                                        <NewInputText type="text" labelTitle="Width" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='toggle.width' register={register} />

                                        <NewInputText type="text" labelTitle="Height" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='toggle.height' register={register} />

                                        <NewInputText type="text" labelTitle="Corner Radius" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='toggle.cornerRadius' register={register} />
                                    </div>

                                    <div className='flex flex-col px-4'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Player
                                        </h4>

                                        <NewInputText type="text" labelTitle="Width" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='player.width' register={register} />

                                        <NewInputText type="text" labelTitle="Height" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='player.height' register={register} />
                                    </div>

                                </div>
                            </div>

                            <div tabIndex={4} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Color Studio
                                </div>
                                <div className="collapse-content p-0">
                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h5 className='text-primary-main text-base font-semibold py-2'>Templates</h5>

                                        <div className="form-control border border-borderColor-main rounded-lg mb-2">
                                            <label className="label cursor-pointer py-[12px] px-4">
                                                <span className="label-text text-base text-primary-main">Red</span>
                                                <input type="radio" {...register("templates")} value="#FF0056" id="red" className="radio bg-[#FF0056] checked:bg-[#FF0056]" checked />
                                            </label>
                                        </div>

                                        <div className="form-control border border-borderColor-main rounded-lg mb-2">
                                            <label className="label cursor-pointer py-[12px] px-4">
                                                <span className="label-text text-base text-primary-main">Blue</span>
                                                <input type="radio" {...register("templates")} value="#00A3FF" id="blue" className="radio bg-[#00A3FF] checked:bg-[#00A3FF]" />
                                            </label>
                                        </div>

                                        <div className="form-control border border-borderColor-main rounded-lg mb-2">
                                            <label className="label cursor-pointer py-[12px] px-4">
                                                <span className="label-text text-base text-primary-main">Green</span>
                                                <input type="radio" {...register("templates")} value="#24CB3F" id="green" className="radio bg-[#24CB3F] checked:bg-[#24CB3F]" />
                                            </label>
                                        </div>

                                        <div className="form-control border border-borderColor-main rounded-lg mb-2">
                                            <label className="label cursor-pointer py-[12px] px-4">
                                                <span className="label-text text-base text-primary-main">Orange</span>
                                                <input type="radio" {...register("templates")} value="#FFBB0E" id="orange" className="radio bg-[#FFBB0E] checked:bg-[#FFBB0E]" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            General
                                        </h4>



                                    </div>

                                </div>
                            </div>

                            <div tabIndex={5} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Font Studio
                                </div>
                                <div className="collapse-content">
                                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                                </div>
                            </div>

                            <div tabIndex={6} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Get Link
                                </div>
                                <div className="collapse-content">
                                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                                </div>
                            </div>

                            <div tabIndex={7} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Instant Embed
                                </div>
                                <div className="collapse-content">
                                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                                </div>
                            </div>
                        </div>

                        <button type='submit'>submit</button>
                    </form>
                </div>



                <div className='col-start-3 col-end-9'>

                </div>
            </div>
        </div>
    )
}

export default CustomizationPage