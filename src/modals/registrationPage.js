import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, Stack, Paper, Text,Flex, Divider, createStyles, Progress, useMantineColorScheme, Select } from '@mantine/core';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { useInterval } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import { User, UserCircle, Number, FaceId, Calendar, Loader2, AddressBook,UserSearch } from 'tabler-icons-react';
import { IconUserCheck, IconMailOpened, IconShieldCheck, IconCircleCheck, IconHash } from '@tabler/icons-react';
import { Badge, Password } from 'tabler-icons-react';
import { IconAt} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import '../styles/Form.module.scss';
import { createUserWithEmailAndPassword,sendEmailVerification,updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import {notifications} from '@mantine/notifications'
import UserDataService from '../services/user.services.js'
import { uploadBytes, ref, getDownloadURL, uploadBytesResumable, uploadString } from 'firebase/storage';
import { storage } from '../firebase';
import  ViewImage  from './UserImageModal';
import WebCamera from '../components/Webcam';
import EmailVerifModal from './verificationEmailModal';


const useStyles = createStyles((theme) => ({
  button: {
    position: 'relative',
    transition: 'background-color 150ms ease',
  },

  progress: {
    ...theme.fn.cover(-1),
    height: 'auto',
    backgroundColor: 'transparent',
    zIndex: 0,
  },

  label: {
    position: 'relative',
    zIndex: 1,
  },
}));


export default function RegisterInfo () {
  const { classes, theme } = useStyles();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(0);
  const isLargeScreen = window.innerWidth >= 1024;
  const [visible, { toggle }] = useDisclosure(false);
  const [completedData, setCompletedData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userUname, setUserUname] = useState('');
  const [userFname, setUserFname] = useState('');
  const [userMname, setUserMname] = useState('');
  const [userLname, setUserLname] = useState('');
  const [userSuffix, setUserSuffix] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [userImgURL, setUserImgURL] = useState('');
  const [picName, setPicName] = useState("");
  const [userBirthday, setUserBirthday] = useState(null);
  const [userCivilStatus, setUserCivilStatus] = useState('');
  const [userCitizenship, setUserCitizenship] = useState('');
  const [userAddress,setUserAddress] = useState('');
  const webcamRef = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [load, setLoad] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [newUserAuth, setNewUserAuth] = useState('');
  const navigate = useNavigate ();
  const [downloadURLFetching, setDownloadURLFetching] = useState(false);
  const date = new Date().toLocaleDateString();
  const [userGenderOptions, setUserGenderOptions] = useState([
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Not Exist? Edit this form' },
  ])
  const [userGender, setUserGender] =useState('');
  const formattedGender = userGender;
  const [showVerifModal, setShowVerifModal] = useState(false);

  // Access the current color scheme using useMantineTheme hook
  const { colorScheme } = useMantineColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );

  const showNotif = (title,msg) => {
    notifications.show({
      title: title,
      message: msg,
      icon: <Badge
      size={60}
      strokeWidth={3}
      color={'black'}
    />
    });
  };


  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      firstname: '',
      middlename:'', //tocreate
      lastname: '',
      gender:'', //tocreate
      contacts: '',
      citizenship: '', //tocreate
      suffix: 'N/A', //tocreate
      civilstatus: '', //tocreate
      image: null,
      picname: '',
      birthdate: '',
      address: '', //tocreate
    },

    validate: (values) => {
      if (active === 0) {
        return {
          username:
          values.username.trim().length < 5
            ? 'Username must include at least 5 characters'
            : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          password:
            values.password.length < 6 ? 'Password must include at least 6 characters' : null,
          confirmPassword: values.confirmPassword !== values.password ? 'Passwords did not match' : null,
        };
      }

      if (active === 1) {
        return {

          firstname:
            values.firstname.trim().length < 1
              ? 'First name is required'
              : null,
          middlename:
          values.middlename.trim().length < 1
            ? 'Middle name is required'
            : null,
          lastname:
          values.lastname.trim().length < 1
              ? 'Last name is required'
              : null,
          contacts:
          values.contacts.trim().length < 11
              ? 'Enter a valid 11 digit number'
              : null,
          birthdate: userBirthday === "" ? 'Enter your birthday!' : null,
          gender: userGender === "" ? 'Enter your gender!' : null,
          citizenship: userCitizenship === "" ? 'Enter your citizenship!' : null,
          address:
            values.address.trim().length < 1
              ? 'Address is required'
              : null,
        };
      }
      if (active == 2) {
        return {
          picname: picName.length < 1 ? 'enter your picture name' : null,
        }
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      } 
      if (active === 2) {
        handleComplete();
        handleCreateUser();
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => {
  setButtonClicked(false);
  setActive((current) => (current > 0 ? current - 1 : current));
  }

  const handleComplete = () => {
    setButtonClicked(true);
    setCompletedData(form.values);
    setUserEmail(form.values.email);
    setUserPassword(form.values.password);
    setUserUname(form.values.username);
    setUserFname(form.values.firstname);
    setUserMname(form.values.middlename);
    setUserLname(form.values.lastname);
    setUserAddress(form.values.address)
    setUserSuffix(form.values.suffix)
    setUserContact(parseInt(form.values.contacts, 10))
  };
  
 

  const handleSaveImage = (imageData, picName) => {
    setUserImage(imageData);
    setPicName(picName);
  };


  const handleCreateUser = async () => {
    try {
      const values = form.values;
      setCompletedData(form.values);
      setUserUname(form.values.username);
      setUserEmail(form.values.email)
      setUserPassword(form.values.confirmPassword)
      
      const isEmailValid = form.validateField('email')
      const isPasswordValid = form.validateField('password')
      const isConfirmPasswordValid = form.validateField('confirmPassword')

      if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {

      await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
      };
      }

      const newUser = auth.currentUser;

      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const handleUploadImage = async () => {
    try {
      // Upload the userImage to Firebase Storage
      console.log('picname: ', picName);
      console.log('userImage: ', userImage);

      const storageRef = ref(storage, `userImages/${picName}`);
      const uploadTask = await uploadString(storageRef, userImage, 'data_url');
      // Update progress state
      const progress = (uploadTask.bytesTransferred / uploadTask.totalBytes) * 100;
      setProgressPercent(progress);

      setDownloadURLFetching(true);

      //fetch the url of the uploaded image
      const fetchRef = ref(storage, `userImages/${picName}`);
      const fetchURL = await getDownloadURL(ref(fetchRef));
      setUserImgURL(fetchURL)

      await updateProfile(auth.currentUser, {
        displayName: userUname, photoURL: userImgURL
      }).then(() => {
        console.log('displayname and photo added')
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })

      await sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('verification email has been sent')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      if (userImgURL !== '') {
        const newUser = {
          userEmail,
          userPassword,
          userUname,
          userFname,userMname,userLname,userSuffix,
          userGender: formattedGender,
          userCivilStatus,
          userCitizenship,
          userContact,
          userImgURL,
          userBirthday,
          userAddress,
        };
        try {
          await UserDataService.addUser(newUser);
          showNotif('You are now registered!');
          console.log('User registered successfully');

        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          showNotif(errorCode, errorMessage);
          console.log(errorCode, errorMessage);
        }
      } else {
        console.log('empty');
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      showNotif(errorCode, errorMessage);
      console.log(errorCode, errorMessage);
    }
  };
  

  return (
    <>
      <Stepper active={active} radius={isLargeScreen ? 'lg' : 'sm'} size={isLargeScreen ? 'md' : 'xs'} breakpoint="md">
        <Stepper.Step  icon={<IconMailOpened size="1.1rem" color={iconColor} />} label="First step" description="User Account Information" >
          <Stack maw={380} mx="auto">
          <Divider my={isLargeScreen ? 'md' : '0'} size={0}></Divider>
          <TextInput
                label="Username"
                placeholder="Username"
                radius="md"
                variant="default"
                size={isLargeScreen ? 'md' : 'xs'}
                withAsterisk
                required={true}
                icon={<User size="0.8rem" color={iconColor}/>}
                {...form.getInputProps('username')}
              />
            <TextInput
              id='emailInput'
              placeholder="Email Address"
              label="Email Address"
              variant="filled"
              radius="md"
              required={true}
              size={isLargeScreen ? 'md' : 'xs'}
              withAsterisk
              visible={visible}
              icon={<IconAt size="0.8rem" color={iconColor}/>}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              placeholder="Password"
              label="Password"
              description="Password must include at least one letter, number and special character"
              radius="md"
              variant="default"
              size={isLargeScreen ? 'md' : 'xs'}
              withAsterisk
              required={true}
              icon={<Password size="0.8rem" color={iconColor}/>}
              visible={visible}
              onVisibilityChange={toggle}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              placeholder="Confirm Password"
              label="Confirm Password"
              radius="md"
              variant="default"
              size={isLargeScreen ? 'md' : 'xs'}
              withAsterisk
              required={true}
              icon={<Password size="0.8rem" color={iconColor}/>}
              visible={visible}
              onVisibilityChange={toggle}
              {...form.getInputProps('confirmPassword')}
            />
          </Stack>
        </Stepper.Step>
        <Stepper.Step icon={<IconUserCheck size="1.1rem" color={iconColor}/>} label="Second step" description={'Personal Information'}>
          
          <Stack maw={550} mx="auto" position='center'>
          <Divider my={isLargeScreen ? '1px' : '0'} size={0}></Divider>
          <Flex  justifyContent="align" gap="md" position='center'>
              <TextInput
                label="First Name"
                placeholder="First Name"
                radius="md"
                variant="default"
                size={isLargeScreen ? 'md' : 'xs'}
                withAsterisk
                required={true}
                icon={<UserCircle size="0.8rem" color={iconColor}/>}
                {...form.getInputProps('firstname')}
              />
              <TextInput
                label="Middle Name"
                placeholder="Middle Name"
                radius="md"
                variant="default"
                size={isLargeScreen ? 'md' : 'xs'}
                withAsterisk
                required={true}
                icon={<User size="0.8rem" color={iconColor}/>}
                {...form.getInputProps('middlename')}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                radius="md"
                variant="default"
                size={isLargeScreen ? 'md' : 'xs'}
                withAsterisk
                required={true}
                icon={<UserCircle size="0.8rem" color={iconColor}/>}
                {...form.getInputProps('lastname')}
              />
              
          </Flex>
            <Flex justifyContent="space-between" gap="md">
            <TextInput
                label="Suffix"
                placeholder="Suffix"
                radius="md"
                variant="default"
                defaultValue={'N/A'}
                size={isLargeScreen ? 'md' : 'xs'}
                icon={<UserCircle size="0.8rem" color={iconColor}/>}
                {...form.getInputProps('suffix')}
              />
            <TextInput
                label="Contact No."
                placeholder="Contact No."
                radius="md"
                variant="default"
                size={isLargeScreen ? 'md' : 'xs'}
                withAsterisk
                required={true}
                icon={<Number size="0.8rem" color={iconColor}/>}
                {...form.getInputProps('contacts')}
                onKeyPress={(event) => {
                  const keyCode = event.which || event.keyCode;
                  const keyValue = String.fromCharCode(keyCode);
                  const regex = /^[0-9\b]+$/; // Only allow numeric characters or backspace

                  if (!regex.test(keyValue)) {
                    event.preventDefault();
                  }
                }}
              />
              <DatePickerInput
                 icon={<Calendar size="0.8rem" color={iconColor}/>}
                 valueFormat="DD/MM/YYYY"
                 dropdownType="popover"
                 label="Birthdate"
                 placeholder="Birthdate"
                 clearable
                 defaultValue={new Date()}
                 value={userBirthday}
                 onChange={setUserBirthday}
                 variant="filled"
                 radius="md"
                 size={isLargeScreen ? 'md' : 'xs'}
                 withAsterisk
                 required={true}
                 maxDate={new Date()}
               />
          </Flex>
          <Flex position='center' gap="md">
               <Select
                placeholder="Gender"
                label="Gender"
                size={isLargeScreen ? 'md' : 'xs'}
                icon={<IconHash size={'0.8rem'} color={iconColor}/>}
                required={true}
                radius='md'
                variant='filled'
                searchable
                creatable
                onSearchChange={setUserGender}
                data={userGenderOptions}
                getCreateLabel={(query) => `+ Click to Create ${query}`}
                onCreate={(query) => {
                  const item = { value: query, label: query};
                  setUserGenderOptions((current) => [...current, item]);
                  return item;
                }}
                styles={(theme) => ({
                  item: {
                    // applies styles to selected item
                    '&[data-selected]': {
                      '&, &:hover': {
                        backgroundColor:
                          theme.colorScheme === 'dark' ? theme.colors.blue[9] : theme.colors.blue[9],
                        color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[5],
                      },
                    },

                    // applies styles to hovered item (with mouse or keyboard)
                    '&[data-hovered]': {},
                  },
                })}
              />
               <Select
                label="Citizenship"
                required={true}
                placeholder="Citizenshp"
                size={isLargeScreen ? 'md' : 'xs'}
                icon={<IconHash size={'0.8rem'} color={iconColor}/>}
                searchable
                onSearchChange={setUserCitizenship}
                searchValue={userCitizenship} 
                radius='md'
                variant='filled'
                data={[
                  { value: "Filipino", label: "Filipino Citizenship (Citizenship by birth or by descent)" },
                  { value:"Natural-born", label: "Natural-born Filipino Citizenship "},
                  { value:"Naturalized",label: "Naturalized Filipino Citizenship" },
                  ]}
                  styles={(theme) => ({
                    item: {
                      // applies styles to selected item
                      '&[data-selected]': {
                        '&, &:hover': {
                          backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.blue[9] : theme.colors.blue[9],
                          color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[5],
                        },
                      },
  
                      // applies styles to hovered item (with mouse or keyboard)
                      '&[data-hovered]': {},
                    },
                  })}
                />
              </Flex>
              <Flex position='center' gap="md">
              <TextInput
                label="Address"
                placeholder="Address"
                radius="md"
                variant="default"
                size={isLargeScreen ? 'md' : 'xs'}
                withAsterisk
                required={true}
                icon={<UserCircle size="0.8rem" color={iconColor}/>}
                {...form.getInputProps('address')}
              />
              <Select
                label="Civil Status"
                required={true}
                placeholder="Civil Status"
                size={isLargeScreen ? 'md' : 'xs'}
                icon={<IconHash size={'0.8rem'} color={iconColor}/>}
                searchable
                onSearchChange={setUserCivilStatus}
                searchValue={userCivilStatus} 
                radius='md'
                variant='filled'
                data={[
                  { value: "Single", label: "Single" },
                  { value:"Married", label: "Married"},
                  { value:"Divorced",label: "Divorced" },
                  { value:"Widowed",label: "Widowed" },
                  { value:"Separated",label: "Separated" },
                  ]}
                  styles={(theme) => ({
                    item: {
                      // applies styles to selected item
                      '&[data-selected]': {
                        '&, &:hover': {
                          backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.blue[9] : theme.colors.blue[9],
                          color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[5],
                        },
                      },
  
                      // applies styles to hovered item (with mouse or keyboard)
                      '&[data-hovered]': {},
                    },
                  })}
                />
            </Flex>
          </Stack>
          
        </Stepper.Step>

        <Stepper.Step icon={<FaceId size="1.1rem" color={iconColor}/>}label="Final step" description="Facial Verification" >
          <Stack maw={380} mx="auto" position="center">
           <WebCamera handleSaveImage={handleSaveImage}/>
        
          </Stack>
        </Stepper.Step>
        {completedData && (
          <Stepper.Completed>
            <Stack maw={380} mx={'auto'}>
              <Paper shadow="xl" radius="md" p= {isLargeScreen ? 'sm' : 'xs'}>
                
                <Stack spacing="sm">
                  <Text align='center' color={iconColor} size={isLargeScreen ? 'lg' : 'md'}>Barangay Registration Information Form</Text>
                  <Flex justifyContent='space-between' gap={'10px'}><IconAt size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Email: {userEmail}</Text> </Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><Password size="1rem"color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Password: {userPassword}</Text> </Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><User size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Username: {userUname}</Text> </Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><UserCircle size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>FirstName: {userFname}</Text></Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><UserCircle size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>MiddleName: {userMname}</Text></Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><UserCircle size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>LastName: {userLname} </Text></Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><UserCircle size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Suffix: {userSuffix} </Text></Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><Number size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Contact Info: {userContact} </Text></Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><UserCircle size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Gender: {userGender} </Text></Flex> 
                  <Flex justifyContent='space-between' gap={'10px'}><Calendar size="1rem" color={iconColor}/><Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Birthdate: {userBirthday ? userBirthday.toLocaleDateString() : "N/A"}</Text></Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><UserSearch size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Civil Status: {userCivilStatus} </Text></Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><UserSearch size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Citizenship: {userCitizenship} </Text></Flex>
                  <Flex justifyContent='space-between' gap={'10px'}><AddressBook size="1rem" color={iconColor}/> <Text color={iconColor} size={isLargeScreen ? 'sm' : 'xs'}>Address: icon{userAddress} </Text></Flex>    
                  <Flex justifyContent='space-between' gap={'10px'}><FaceId size="1rem" color={iconColor}/> <ViewImage image={userImage} /></Flex>
                  
                </Stack>
              </Paper>
            </Stack>
          </Stepper.Completed>
        )}
      </Stepper>

      <Group position="center" mt="xl">
  {active !== 0 && (
    <Button size={isLargeScreen ? 'md' : 'xs'} variant="gradient" onClick={prevStep}>
      Back
    </Button>
  )}

  {active !== 3 && (
    <Button size={isLargeScreen ? 'md' : 'xs'} variant="gradient" onClick={nextStep}>
      Next step
    </Button>
  )}
    {(buttonClicked===true && active === 3) && (
     <Button
     variant='gradient'
     size={isLargeScreen ? 'md' : 'xs'}
     className={classes.button}
     onClick={(e) => {
      e.preventDefault();
      if (loaded) {
        setLoaded(false)
        handleFinalSubmit(e);
        setButtonClicked(false);
        setShowVerifModal(true);
      } else {
        !interval.active && interval.start()
        handleCreateUser();
        handleUploadImage();
      }
    }}
     color={loaded ? 'teal' : theme.primaryColor}
   >
     <div className={classes.label}>
       {progress !== 0 ? 'Getting Ready... Please Wait UP.' : loaded ? 'Continue' : 'Finish SignUp'}
     </div>
     {progress !== 0 && (
       <Progress
         value={progress}
         className={classes.progress}
         color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
         radius="sm"
       />
     )}
   </Button>)}
   {(showVerifModal && active === 3) && <EmailVerifModal/>}
</Group>
      

    </>
  );
}
