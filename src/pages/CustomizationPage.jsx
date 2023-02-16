import React, { useEffect, useRef, useState } from 'react'
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
import ClipBoardSvg from '../assets/svgs/ClipBoardSvg';
import ShareSvg from '../assets/svgs/ShareSvg';
import workspace1 from "../assets/images/workspace-1.png";
import PlayButtonSvg from '../assets/svgs/PlayButtonSvg';


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


const leftIcon = () => (
    <div class="avatar placeholder">
        <div class="bg-[#EC407A] text-white text-xs rounded-full w-8">
            <span>MX</span>
        </div>
    </div>
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


const ColorObj = {

    colorStudio: {
        general: {
            videoTitle: "#FFFFFF",
            videoDescription: "#FFFFFF",
            gradientOverlay: "#273149",
            shadow: "#273149",
        },
        player: {
            controls: "#FFFFFF",
            seeker: "#FFFFFF",
            authorName: "#FFFFFF",
            authorOccupation: "#FFFFFF",
        },
        toggle: {
            playIcon: "#FFFFFF",
            closeBackground: "#FFFFFF",
            closeIconColor: "#FFFFFF",
            closeIconBorder: "#FFFFFF",
        },
        callToAction: {
            buttonText: "#FFFFFF",
            buttonBackground: "#1B5CF3",
            buttonOutline: "#FFFFFF",
            buttonIcon: "#FFFFFF",
        },
        others: {
            backgroundOverlay: "#000000",
        }
    },
}


const VolumeSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>

)

const DashSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>

)





const CustomizationPage = () => {

    const dispatch = useDispatch();
    const [pickColor, setPickColor] = useState(ColorObj);

    const colorHandler = (e) => {

        // console.log("name", e.target.name);
        // console.log("value", e.target.value);

        let inputName = e.target.name;
        let inputValue = e.target.value;

        // console.log("1", [inputName.split('.')[1]]);
        // console.log("2", { ...pickColor.colorStudio[inputName.split('.')[1]] });
        // console.log("3", { [inputName.split('.')[1]]: { ...pickColor.colorStudio[inputName.split('.')[1]] } });

        setPickColor({ colorStudio: { ...pickColor.colorStudio, [inputName.split('.')[1]]: { ...pickColor.colorStudio[inputName.split('.')[1]], [inputName.split('.')[2]]: inputValue } } })
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


    const ClapprComponent = ({ id, source, height, width }) => {
        let player = useRef();

        useEffect(() => {
            player.current = new Clappr.Player({
                source: "http://clappr.io/highline.mp4",
                poster: 'http://clappr.io/poster.png',
                parentId: "#player",
                height,
                width,

                // events: {
                //     onPlay: function () {
                //         player.current.resize({ height: 360, width: 640 });
                //     }
                // }

            });

        }, [])

        return (
            <>
                <div className="absolute bottom-0 rounded-2xl overflow-hidden ">

                    <div className="relative">
                        <div ref={player} id={id}></div>

                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">

                            <div className='flex flex-col justify-between h-full p-3'>
                                <div className="flex justify-between">
                                    <div className='flex'>
                                        <h5 className="text-white text-base">Elie MoreReels</h5>
                                    </div>

                                    <div className='flex'>
                                        <VolumeSvg />
                                        <DashSvg />
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <h4 className='text-2xl text-white mb-3'>This is PopMe!</h4>

                                    <p className="text-sm text-white" >A widget you can use to upload videos
                                        and get personal with your customers to
                                        schedule meetings, ask for reviews, or
                                        share the latest features with its CTA
                                        functionnality.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0">
                    <div className="relative">
                        <img src={workspace1} alt="workspace1" className="h-[200px] w-full object-cover rounded-xl" />
                        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                            <PlayButtonSvg />
                        </div>
                    </div>
                </div>

            </>
        );
    };



    return (
        <div className="inline-block w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="h-full">
                <div className="grid grid-cols-8 h-full">
                    <div className='col-start-1 col-end-3 py-3 border-r overflow-auto max-h-full'>
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



                        <div className='flex flex-col'>
                            <div tabIndex={0} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Basic Setup
                                </div>
                                <div className="collapse-content">
                                    <div className='flex flex-col'>
                                        <div className='flex'>
                                            <NewInputText type="url" labelTitle="Website URL" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name="basicSetup.websiteUrl" register={register} />
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

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Add Video
                                </div>
                                <div className="collapse-content">
                                    <div className='flex flex-col'>

                                        <div className='flex'>
                                            <UploadFile name='addVideo.addVideo' register={register} handleFile={(e) => handleFile(e)} removeImage={(e) => removeImage(e)} files={files} />
                                        </div>

                                        <div className='flex'>
                                            <NewInputText type="text" labelTitle="Video Title" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='addVideo.videoTitle' register={register} />
                                        </div>

                                        <div className='flex'>
                                            <NewTextArea labelTitle="Video Description" labelStyle="text-primary-main text-base font-semibold" inputStyle="!bg-transparent" name='addVideo.videoDescription' register={register} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div tabIndex={2} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Call To Action
                                </div>
                                <div className="collapse-content">
                                    <div className='flex flex-col'>
                                        <NewInputText type="text" labelTitle="Button Text" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='callToAction.buttonText' register={register} />

                                        <NewInputText type="url" labelTitle="Destination URL" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='callToAction.destinationUrl' register={register} />

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

                                        <SelectBox labelTitle="Button Style" labelStyle="text-primary-main text-base font-semibold" options={[{ name: "Filled", value: "filled" }, { name: "Dashed", value: "dashed" }]} containerStyle="min-w-[10rem] mb-3" selectStyle="text-primary-main" name="callToAction.buttonStyle" register={register} />

                                        <SelectBox labelTitle="Button Corners" labelStyle="text-primary-main text-base font-semibold" options={[{ name: "Round", value: "round" }, { name: "Square", value: "square" }]} containerStyle="min-w-[10rem] mb-3" selectStyle="text-primary-main" name="callToAction.buttonCorners" register={register} />
                                    </div>
                                </div>
                            </div>

                            <div tabIndex={3} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Design Customization
                                </div>
                                <div className="collapse-content p-0">
                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <InputWithIcon type="text" labelTitle="Author Picture" labelStyle="text-primary-main text-base font-semibold" inputStyle="!bg-transparent" name='designCustomization.authorPicture' register={register} leftIcon={leftIcon()} />

                                        <NewInputText type="text" labelTitle="Vertical Margin" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='designCustomization.verticalMargin' register={register} />

                                        <NewInputText type="text" labelTitle="Horizontal Margin" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='designCustomization.horizontalMargin' register={register} />
                                    </div>


                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Toggle
                                        </h4>

                                        <NewInputText type="text" labelTitle="Width" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='designCustomization.toggle.width' register={register} />

                                        <NewInputText type="text" labelTitle="Height" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='designCustomization.toggle.height' register={register} />

                                        <NewInputText type="text" labelTitle="Corner Radius" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='designCustomization.toggle.cornerRadius' register={register} />
                                    </div>

                                    <div className='flex flex-col px-4'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Player
                                        </h4>

                                        <NewInputText type="text" labelTitle="Width" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='designCustomization.player.width' register={register} />

                                        <NewInputText type="text" labelTitle="Height" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='designCustomization.player.height' register={register} />
                                    </div>

                                </div>
                            </div>

                            <div tabIndex={4} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Color Studio
                                </div>
                                <div className="collapse-content p-0">
                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h5 className='text-primary-main text-base font-semibold py-2'>Templates</h5>

                                        <div className="form-control border border-borderColor-main rounded-lg mb-2">
                                            <label className="label cursor-pointer py-[12px] px-4">
                                                <span className="label-text text-base text-primary-main">Red</span>
                                                <input type="radio" {...register("colorStudio.templates")} value="#FF0056" id="red" className="radio bg-[#FF0056] checked:bg-[#FF0056]" checked />
                                            </label>
                                        </div>

                                        <div className="form-control border border-borderColor-main rounded-lg mb-2">
                                            <label className="label cursor-pointer py-[12px] px-4">
                                                <span className="label-text text-base text-primary-main">Blue</span>
                                                <input type="radio" {...register("colorStudio.templates")} value="#00A3FF" id="blue" className="radio bg-[#00A3FF] checked:bg-[#00A3FF]" />
                                            </label>
                                        </div>

                                        <div className="form-control border border-borderColor-main rounded-lg mb-2">
                                            <label className="label cursor-pointer py-[12px] px-4">
                                                <span className="label-text text-base text-primary-main">Green</span>
                                                <input type="radio" {...register("colorStudio.templates")} value="#24CB3F" id="green" className="radio bg-[#24CB3F] checked:bg-[#24CB3F]" />
                                            </label>
                                        </div>

                                        <div className="form-control border border-borderColor-main rounded-lg mb-2">
                                            <label className="label cursor-pointer py-[12px] px-4">
                                                <span className="label-text text-base text-primary-main">Orange</span>
                                                <input type="radio" {...register("colorStudio.templates")} value="#FFBB0E" id="orange" className="radio bg-[#FFBB0E] checked:bg-[#FFBB0E]" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            General
                                        </h4>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Video Title</h5>
                                            <ColorPickerInput name='colorStudio.general.videoTitle' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.general.videoTitle} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Video Description</h5>
                                            <ColorPickerInput name='colorStudio.general.videoDescription' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.general.videoDescription} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Gradient Overlay</h5>
                                            <ColorPickerInput name='colorStudio.general.gradientOverlay' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.general.gradientOverlay} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Shadow</h5>
                                            <ColorPickerInput name='colorStudio.general.shadow' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.general.shadow} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Player
                                        </h4>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Controls</h5>
                                            <ColorPickerInput name='colorStudio.player.controls' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.player.controls} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Seeker</h5>
                                            <ColorPickerInput name='colorStudio.player.seeker' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.player.seeker} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Author Name</h5>
                                            <ColorPickerInput name='colorStudio.player.authorName' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.player.authorName} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Author Occupation</h5>
                                            <ColorPickerInput name='colorStudio.player.authorOccupation' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.player.authorOccupation} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Toggle
                                        </h4>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Play Icon</h5>
                                            <ColorPickerInput name='colorStudio.toggle.playIcon' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.toggle.playIcon} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Close Background</h5>
                                            <ColorPickerInput name='colorStudio.toggle.closeBackground' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.toggle.closeBackground} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Close Icon Color</h5>
                                            <ColorPickerInput name='colorStudio.toggle.closeIconColor' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.toggle.closeIconColor} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Close Icon Border</h5>
                                            <ColorPickerInput name='colorStudio.toggle.closeIconBorder' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.toggle.closeIconBorder} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Call To Action
                                        </h4>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Button Text</h5>
                                            <ColorPickerInput name='colorStudio.callToAction.buttonText' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.callToAction.buttonText} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Button Background</h5>
                                            <ColorPickerInput name='colorStudio.callToAction.buttonBackground' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.callToAction.buttonBackground} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Button Outline</h5>
                                            <ColorPickerInput name='colorStudio.callToAction.buttonOutline' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.callToAction.buttonOutline} />
                                        </div>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Button Icon</h5>
                                            <ColorPickerInput name='colorStudio.callToAction.buttonIcon' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.callToAction.buttonIcon} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col px-4 pb-3 border-b border-borderColor-main'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Others
                                        </h4>

                                        <div className='flex flex-col'>
                                            <h5 className='text-primary-main text-base font-semibold py-2'>Background Overlay</h5>
                                            <ColorPickerInput name='colorStudio.others.backgroundOverlay' register={register} colorHandler={(e) => colorHandler(e)} pickColor={pickColor.colorStudio.others.backgroundOverlay} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div tabIndex={5} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Font Studio
                                </div>
                                <div className="collapse-content">
                                    <div className='flex flex-col'>
                                        <SelectBox labelTitle="Font Family" labelStyle="text-primary-main text-base font-semibold" options={[{ name: "Poppins", value: "poppins" }, { name: "Roboto", value: "roboto" }]} containerStyle="min-w-[10rem] mb-3" selectStyle="text-primary-main" name="fontStudio.fontFamily" register={register} />

                                        <NewInputText type="text" labelTitle="Video Title" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='fontStudio.videoTitle' register={register} />

                                        <NewInputText type="text" labelTitle="Video Description" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='fontStudio.videoDescription' register={register} />

                                        <NewInputText type="text" labelTitle="CTA Button" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='fontStudio.ctaButton' register={register} />

                                        <NewInputText type="text" labelTitle="Author Name" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='fontStudio.authorName' register={register} />

                                        <NewInputText type="text" labelTitle="Author Occupation" labelStyle="text-primary-main text-base font-semibold" inputStyle="mb-3 !bg-transparent" name='fontStudio.authorOccupation' register={register} />
                                    </div>
                                </div>
                            </div>

                            <div tabIndex={6} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Get Link
                                </div>
                                <div className="collapse-content">
                                    <div className='flex flex-col'>
                                        <h4 className="text-xl font-bold text-primary-normal py-4">
                                            Share Link
                                        </h4>

                                        <div className='flex'>
                                            <ClipBoardSvg width='60' />

                                            <p className='text-base text-[#202223] ml-3'>You can share your facepop widget through a direct link without embedding it on your website.</p>
                                        </div>

                                        <InputWithIcon type="text" labelTitle="PopMe Custom Link" labelStyle="text-primary-main text-base font-semibold" inputStyle="!bg-transparent" name='getLink.popMeCustomLink' register={register} rightIcon={<ShareSvg />} />
                                    </div>
                                </div>
                            </div>

                            <div tabIndex={7} className="collapse collapse-arrow border-t border-borderColor-main bg-transparent">
                                <input type="checkbox" />

                                <div className="collapse-title text-xl font-bold text-primary-normal">
                                    Instant Embed
                                </div>

                                <div className="collapse-content">
                                    <div tabIndex={8} className="collapse collapse-arrow border border-borderColor-main rounded-lg mb-3">

                                        <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                                            www.mywebsite.com
                                        </div>
                                        <div className="collapse-content">
                                            <SelectBox labelTitle="In this website" labelStyle="text-primary-main text-base font-semibold" options={[{ name: "Show in some pages", value: "some pages" }, { name: "Option 2", value: "option2" }]} containerStyle="mt-2 mb-3" selectStyle="text-primary-main" name="instantEmbed.inThisWebsite" register={register} />

                                            <div className='flex mb-3'>
                                                <ClipBoardSvg width='60' />
                                                <p className='text-base text-[#202223] ml-3'>This widget will show only in the pages/URLs selected below.</p>
                                            </div>

                                            <div className="inline-block w-full mb-3">
                                                <Button text="Select pages" buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main" />
                                            </div>

                                            <div className="inline-block w-full mb-3">
                                                <Button text="Add conditions" buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main" />
                                            </div>
                                        </div>
                                    </div>

                                    <div tabIndex={9} className="collapse collapse-arrow border border-borderColor-main rounded-lg mb-3">

                                        <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                                            www.mywebsite#2.com
                                        </div>
                                        <div className="collapse-content">
                                            <p>Lorem Ipsum is simply dummy text of the printing.</p>
                                        </div>
                                    </div>

                                    <div tabIndex={10} className="collapse collapse-arrow border border-borderColor-main rounded-lg">

                                        <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                                            www.mywebsite#3.com
                                        </div>
                                        <div className="collapse-content">
                                            <p>Lorem Ipsum is simply dummy text of the printing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='col-start-3 col-end-9'>

                        <div className="inline-block w-full">
                            <div className='flex justify-between items-center py-6 px-4 lg:px-6 border-b'>
                                <h3 className='text-primary-normal font-bold text-2xl'>Preview</h3>

                                <div className='flex'>
                                    <Button type='submit' text="Save" buttonClass="w-32 text-base max-w-full h-[2.50rem] min-h-[2.50rem]" />
                                </div>
                            </div>

                            <div className='inline-block w-full h-[calc(100vh-183px)] relative'>

                                <ClapprComponent
                                    id="player"
                                    source="https://www.w3schools.com/tags/movie.ogg"
                                    height={461}
                                    width={261}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CustomizationPage