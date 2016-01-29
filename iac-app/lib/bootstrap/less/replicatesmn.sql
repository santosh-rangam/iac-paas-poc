procedure fcat_replicate_smn (p_cur out utilities.global_cursor) is 
 begin
    open p_cur for
        SELECT  distinct engine_model
        FROM qsl_engine_list_new 
        where engine_model like '%QS%' and fuel_system!='48' and engine_model not in (select distinct SMN_TBL_PID from  FCAT_SM_ROOT_ASSC)
        union
   SELECT  distinct engine_model
        FROM qsl_engine_list_new 
        where engine_model like '%IS%' and fuel_system!='48' and engine_model not in (select distinct SMN_TBL_PID from  FCAT_SM_ROOT_ASSC) order by engine_model ;
 end ;
 
  loop
              select FCAT_FC_DETAILS_SEQ.nextval into v_seq from dual; 
              insert into FCAT_FC_DETAILS values (v_seq,records.VOLTAGE,records.ECM,records.COMPONENTS,records.FAILURE_TYPE,records.STREAM);
         procedure replicate_smn_data(p_smn_src in varchar2,p_smn_dest in varchar2,p_rfc_chk in varchar2,p_fc_config_chk in varchar2,p_fc_interaction_chk in varchar2,p_result out varchar2) is
   v_pid_fc_details number;
   v_pid_rootfc_smn number;
   v_seq number;  
   chk_duplicate number;
   count_var number;
 cursor rootfc is
         select *  from FCAT_SM_ROOT_ASSC
         inner join FCAT_ROOT_FC_LKP on FCAT_ROOT_FC_LKP.ROOT_FC_TBL_PID=FCAT_SM_ROOT_ASSC.ROOT_FC_TBL_PID
         where smn_tbl_pid=p_smn_src;
         
 cursor fcconfig is
         select * from  FCAT_FC_DETAILS 
         inner join FCAT_LKP_DETAILS_ASSC on  FCAT_LKP_DETAILS_ASSC.PID_FC_DETAILS = FCAT_FC_DETAILS.PID_FC_DETAILS
         where PID_SMN_TBL =p_smn_src; 

 cursor fcinteractions is
           select * from FCAT_SMN_ROOTFC_DETAILS_ASSC 
           inner join FCAT_SM_ROOT_ASSC on FCAT_SM_ROOT_ASSC.PID_SM_ROOT_ASSC=FCAT_SMN_ROOTFC_DETAILS_ASSC.PID_SM_ROOT_ASSC  
           inner join FCAT_ROOT_FC_LKP on FCAT_ROOT_FC_LKP.ROOT_FC_TBL_PID=FCAT_SM_ROOT_ASSC.ROOT_FC_TBL_PID
           where FCAT_SM_ROOT_ASSC.SMN_TBL_PID=p_smn_src ;--and FCAT_ROOT_FC_LKP.root_fc=p_rfc;   
   begin
    for records in rootfc 
        loop
           select count(*) into chk_duplicate from FCAT_SM_ROOT_ASSC
           inner join FCAT_ROOT_FC_LKP on FCAT_ROOT_FC_LKP.ROOT_FC_TBL_PID=FCAT_SM_ROOT_ASSC.ROOT_FC_TBL_PID
           where root_fc=TRIM(records.root_fc)
           and smn_tbl_pid=p_smn_dest; 
            
           if(chk_duplicate=0) then
                    select FCAT_ROOT_FC_LKP_SEQ.nextval into v_seq from dual; 
                    insert into FCAT_ROOT_FC_LKP values(v_seq,TRIM(records.root_fc));
                    insert into FCAT_SM_ROOT_ASSC values(FCAT_SMN_FC_DETS_ASSC_SEQ.nextval,v_seq,p_smn_dest);
                      commit;  
           else
                      p_result:='exists';         
           end if;  
        end loop; 
        
    for records in fcconfig 
            insert into FCAT_LKP_DETAILS_ASSC values(FC_LKP_DETAILS_ASSC_SEQ.nextval,records.PID_FC_LKP,v_seq,p_smn_dest);   
                commit;  
        end loop;
        
     for records in fcinteractions
        loop       
              select count(*) into count_var from FCAT_LKP_DETAILS_ASSC where PID_FC_LKP=records.PID_FC_LKP and PID_SMN_TBL=p_smn_dest;              
--              if(count_var  =0) then
--              
--              else
--              
--              end if;  
                                                         
              select pid_fc_details into v_pid_fc_details from FCAT_LKP_DETAILS_ASSC where PID_FC_LKP=records.PID_FC_LKP and PID_SMN_TBL=p_smn_dest;           
            insert into debus values(records.ROOT_FC,p_smn_dest,'b4','b4','b4','b4','b4','b4','b4'); 
             select PID_SM_ROOT_ASSC into v_pid_rootfc_smn from FCAT_SM_ROOT_ASSC 
              inner join FCAT_ROOT_FC_LKP on FCAT_ROOT_FC_LKP.ROOT_FC_TBL_PID=FCAT_SM_ROOT_ASSC.ROOT_FC_TBL_PID         
              where SMN_TBL_PID = p_smn_dest and ROOT_FC =TRIM(records.ROOT_FC);              
              
              select count(*) into chk_duplicate from FCAT_SMN_ROOTFC_DETAILS_ASSC
              inner join FCAT_SM_ROOT_ASSC on FCAT_SM_ROOT_ASSC.PID_SM_ROOT_ASSC=FCAT_SMN_ROOTFC_DETAILS_ASSC.PID_SM_ROOT_ASSC  
              where PID_FC_LKP= TRIM(records.PID_FC_LKP) and  FCAT_SM_ROOT_ASSC.SMN_TBL_PID=p_smn_dest and FCAT_SMN_ROOTFC_DETAILS_ASSC.PID_SM_ROOT_ASSC=v_pid_rootfc_smn;
               if(chk_duplicate=0) then
               insert into debus values(chk_duplicate,FCAT_SMN_FC_DETS_ASSC_SEQ.nextval,records.PID_FC_LKP,v_pid_rootfc_smn,'in','in','in','in','in');
                insert into  FCAT_SMN_ROOTFC_DETAILS_ASSC values(FCAT_SMN_FC_DETS_ASSC_SEQ.nextval,TRIM(records.PID_FC_LKP),v_pid_rootfc_smn);               
               else
                   p_result:='exists';    
                    insert into debus values(chk_duplicate,'out','out','out','out','out','out','out','out');              
               end if;                     
        end loop;               
   end; 
   